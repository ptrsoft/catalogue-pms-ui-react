"use client";
import React from "react";
import { DataStore } from "@aws-amplify/datastore";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavLink from "@/app/nav-link";

import { Form, Input, Upload, Button, message, DatePicker } from "antd";
import { useSelector } from "react-redux";
import api from "@/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UploadOutlined } from "@ant-design/icons";
import useProject from "@/HOC/Project/Project";

const { RangePicker } = DatePicker;



import moment from "moment";
import { useDispatch } from "react-redux";
import { clearProjectName, updateFormData, UpdateStartDate } from "@/Context/AddNewProjectSlice/addProjectSlice";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AddNewProjectForm = ({ receiveFormDataFromChild }) => {
  const [imageBase64, setImageBase64] = useState();

  const formData = useSelector((state) => state.addProject);
  const [startDate, setStartDate] = useState(null);
  const initialProjectState = formData || {
    projectName: "",
    projectDescription: "",
    projectDepartment: "",
    startDate: "",
    endDate: "",
    projectId: "",
    image_url: "",
  };
  const [project, setProject] = useState(initialProjectState);
  const dispatch = useDispatch();
  // Update project state when Redux data changes
  useEffect(() => {
    setProject(formData || initialProjectState);
  }, [formData, initialProjectState]);



  const disabledEndDate = (current) => {
    // Disable dates that are before the selected start date or are the selected start date
    return current && (current <= startDate);
  };

  const handleChange = (e) => {
    // Update the project state as the user types
    setProject({ ...project, [e.target.name]: e.target.value });
    dispatch(updateFormData({ ...project, [e.target.name]: e.target.value }));

    console.log(project)
  };

  const handleStartDateChange = (date, dateString) => {
    const formattedStartDate = moment(dateString).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    setStartDate(date);
    setProject({
      ...project,
      startDate: formattedStartDate,
    });

    // Dispatch the updated form data with the startDate included
    dispatch(updateFormData({ ...project, startDate: formattedStartDate }));
  };


  const handleEndDateChange = (date, dateString) => {
    const formattedStartDate = moment(dateString).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    setProject({
      ...project,
      endDate: formattedStartDate,
    });

    // Dispatch the updated form data with the startDate included
    dispatch(updateFormData({ ...project, endDate: formattedStartDate }));
  };

  const handleImageUpload = async (info) => {
    const file = info.file.originFileObj;
    dispatch(updateFormData({ ...project, image_url: imageBase64 }));

    try {
      // Convert the image file to base64 format
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64String = event.target.result;
        setImageBase64(base64String);

        // Dispatch the updated form data with the image base64 string
        setProject({
          ...project,
          image_url: base64String,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  const router = useRouter();

  // useProject
  const projectData = useSelector(state => state.addProject);
  console.log(projectData)
  function disabledDate(current) {
    // Disable all dates before today
    return current && current < moment().startOf('day');
  }
  return (
    <div>
      <section className="flex flex-col items-center flex-shrink-0  w-auto py-1 bg-white ">
        <Form
          {...layout}
          name="nest-messages"
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
          initialValues={project}
        >
          <Form.Item
            name={["Projectname"]}
            label="Projectname"
            rules={[
              {
                message: "Please input the project name!",
              },
            ]}
          >
            <Input
              value={project.projectName}
              onChange={handleChange}
              name="Projectname"
              id="Projectname"
            />
          </Form.Item>

          <Form.Item
            name={["projectDescription"]}
            label="Project Description"
            rules={[
              {
                message: "Please input the project description!",
              },
            ]}
          >
            <Input
              name="projectDescription"
              id="projectDescription"
              value={project.projectDescription}
              onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name={["projectDepartment"]}
            label="Project Department"
            rules={[
              {
                message: "Please input the project department!",
              },
            ]}
          >
            <Input
              name="projectDepartment"
              id="projectDepartment"
              value={project.projectDepartment}
              onChange={handleChange} />
          </Form.Item>

          <Form.Item name="range-time-picker" label="Project Duration">
            <div className="flex">
              <DatePicker
                id="projectStartDate"
                placeholder="Start Date"
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200  px-1 py-1 h-8 w-[184px] m-1"
                // value={project.startDate}
                onChange={handleStartDateChange}
                disabledDate={disabledDate}
              // value={project.startDate}
              />
              <span>-</span>
              <DatePicker
                id="projectEndDate"
                placeholder="End Date"
                className="text-slate-500 font-sans text-sm font-normal not-italic leading-6 pb-1 self-stretch items-center flex-1 border rounded-sm border-slate-200shadow px-1 py-1 h-8 w-[184px] m-1"
                disabledDate={disabledEndDate}
                onChange={handleEndDateChange}
              />
            </div>
          </Form.Item>

          <Form.Item
            name="Project Icon"
            label="Project Icon"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            {/* <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload> */}


            <Upload
              name="image_url"
              type="file"
              accept="image/*"
              className="flex flex-col items-start ml-1"
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              alt="Uploaded Image"
              onChange={handleImageUpload}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {/* <Button
            type="submit"
            className="ml-[90%] m-10 px-2 py-1 justify-center items-center rounded-sm border border-blue-500 bg-blue-500 shadow-sm h-8 font-sans text-center text-white text-sm font-normal not-italic leading-3 flex-row-reverse"
            onClick={handleSubmit}
          >
            Submit
          </Button> */}
        </Form>
      </section>
    </div>
  );
};

export default AddNewProjectForm;