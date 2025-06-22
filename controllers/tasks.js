import { TryCatch } from "../middleware/error.js";
import { Task } from "../models/tasks.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



export const createTask = TryCatch(async (req, res)=>{
    const { title, description, status, dueDate } = req.body;
    if (!title || !description || !status) {
        return res.status(400).json({ message: "Please provide all required fields", success: false });
    }
    
     let image;    
       try {
         if (req.file) {     
       const cloud_image = await uploadOnCloudinary(req.file.path);
       console.log("Cloud image response:", cloud_image);
       if(!cloud_image) {
           throw new ErrorHandler("Image upload failed", 500);
       }
       if (cloud_image?.url) {
         image = cloud_image.url;
       }
    }
       } catch (error) {
            console.error("Error uploading image:", error);
            throw new ErrorHandler("Image upload failed", 500);
       }

    const task = await Task.create({
        title,
        description,
        status,
        image,
        dueDate,
        createdBy: req.user._id
    });

    if (!task) {
        throw new ErrorHandler("Failed to create task", 500);
    }

    return res.status(201).json({ message: "Task created successfully", task,success: true });
});

export const getMyTasks = TryCatch (async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user._id }).populate('createdBy');
    
    if (!tasks || tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found", success: false });
    }

    return res.status(200).json({ tasks,success: true });
});

export const updateTask = TryCatch(async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Task ID is required", success: false });
    }

    const task = await Task.findById(id);
    if (!task) {
        return res.status(404).json({ message: "Task not found", success: false });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;

    if (req.file) {
        const cloud_image = await uploadOnCloudinary(req.file.path);
        if (cloud_image?.url) {
            task.image = cloud_image.url;
        }
    }

    await task.save();

    return res.status(200).json({ message: "Task updated successfully", task,success: true });
})

export const deleteTask = TryCatch(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Task ID is required",success: false });
    }

    const task = await Task.findById(id);
    if (!task) {
        return res.status(404).json({ message: "Task not found",success: false });
    }
    await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: "Task deleted successfully",success: true });
})