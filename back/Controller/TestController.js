const express = require('express');
const Test = require("../models/Test");

const createTest=async(req,res)=>{
    const {question, answer}=req.body;
    const newTest=new Test({
        question:question,
        answer:answer
    });

    const data=await newTest.save();
    res.status(200).json({message:"Test Added!", data});
}

module.exports ={
    createTest
}