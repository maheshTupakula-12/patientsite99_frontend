import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import doctor from "./images/doctor.jpeg"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { DNA } from "react-loader-spinner";

function BookAppointment() {
    const location = useLocation();
    // const {list} = useSelector((state)=>state.expertiseReducer);
    // const [problem, setProblems] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [selected, setSelected] = useState("");
    const [description, setDescription] = useState("");
    const [timeData, setTimeData] = useState("")
    const [textInput, setTextInput] = useState("");
    const [services, setServices] = useState([]);
    const [serviceTemp, setServiceTemp] = useState([]);
    const [diseaseData, setDiseaseData] = useState([]);
    const [diseases, setDiseases] = useState([]);
    const [status, setStatus] = useState("");
    const getQueryParams = (search) => {
        return new URLSearchParams(search);
    };
    const [showLoader, setShowLoader] = useState(false)
    const [show, setShow] = useState(false);
    const [doc, setDoc] = useState("");
    const queryParams = getQueryParams(location.search);
    const name = queryParams.get('name');

    const { bool_value, input_str } = useMemo(() => {
        return location.state.docinfo.docinfo === "" ? { bool_value: false } : { bool_value: true, input_str: doc.image_of_doctor };
    }, [doc])
    useEffect(() => {
        const handleClick = (e) => {
            if (e.target === document.getElementById("search")) {
                setShow(true);
            } else {
                if (document.getElementById("show_element") && !document.getElementById("show_element").contains(e.target)) {
                    setShow(false);
                }
            }
        }
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    })

    useEffect(() => {
        const handleClick = (e) => {
            const element = document.getElementById("show_element");
            if (element && element.contains(e.target)) {
                const value = e.target.getAttribute("data-value");
                setTextInput(value)
            }
        }
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [])

    useEffect(() => {
        setDoc(location.state.docinfo)
    }, [location.state])

    useEffect(() => {
        async function fetchServices() {
            await fetch("https://doctorsite-backend.onrender.com/doc/services", {
                method: "GET",
            }).then((response) => response.json())
                .then((data) => {
                    console.log(data["data"])
                    const temp = data["data"].map((item) => item["data"].organ)
                    setDiseaseData(data["data"].map((item) => {
                        return {
                            organ: item["data"].organ,
                            disease: item["data"].diseases,
                        }
                    }))
                    setServiceTemp(temp);
                    setServices(temp);
                })
                .catch(err => console.log(err))
        }
        fetchServices()
    }, [])

    useEffect(() => {
        setServices(serviceTemp.filter((service) => service.includes(textInput)));
        const item = diseaseData.find((item) => item.organ.includes(textInput));
        console.log(item)
        setDiseases(item?.disease)
    }, [textInput])

    useEffect(() => {
        console.log("query params", name);
    }, [name]); // Add 'name' to the dependency array

    useEffect(() => {
        console.log(doc)
    }, [doc])

    const handleTime = (e) => {
        setTimeData(e.target.value)
    }

    function convertTimeToMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    function isTimeBetween(from, to, check) {
        const fromMinutes = convertTimeToMinutes(from);
        const toMinutes = convertTimeToMinutes(to);
        const checkMinutes = convertTimeToMinutes(check);

        // Ensure "to" time is after "from" time for a single-day range
        if (toMinutes < fromMinutes) {
            return checkMinutes >= fromMinutes || checkMinutes <= toMinutes;
        }

        return checkMinutes >= fromMinutes && checkMinutes <= toMinutes;
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }


    const bookSlot = async () => {
        if (timeData === "") {
            toast.error("please select time")
            return;
        }
        setStatus("")
        setShowLoader(true)
        fetch("https://doctorsite-backend.onrender.com/doc/appointment", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name: doc.name,
                id: doc.id,
                addToSlot: timeData,
                suffering_with: textInput,
                date: startDate,
                particular_disease: selected,
                description: description
            })
        })
            .then((response) => response.json())
            .then(data => {
                const temp = Object.values(data);
                const b = data.status === "failure" ? 0 : 1;
                for (let j = 0; j < temp.length; j++) {
                    if (b === 1) {
                        toast.success(temp[j]);
                    } else {
                        toast.error(temp[j]);
                    }
                }
                setStatus(data.status)
                setShowLoader(false)
            })
            .catch(() => {
                setStatus("failure")
                setShowLoader(false)
            })
    }
    useEffect(()=>{
        console.log(status)
    },[status])
    return (
        <div style={{ height: "100vh", padding: "10px 10px 10px 10px", overFlow: "auto" }}>
            <div style={{ display: "flex" }}>
                <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginRight: "40px", width: "300px", height: '330px', backgroundColor: "gray", color: "white", boxShadow: "0 4px 8px rgba(0,0,0,0.9)" }}>
                    <div style={{ backgroundColor: "white", height: "170px" }}>
                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={bool_value === false ? doctor : input_str} alt={"doc"} />
                    </div>
                    <div style={{ padding: "10px 10px 10px 10px" }}>
                        <div>Name:{doc.name}</div>
                        <div>qualification:{doc.qualification}</div>
                        <div>expertise:{doc.expertise}</div>
                        <div>available timings</div>
                        <div>
                            <div>from:{doc.fromTime}</div>
                            <div>to:{doc.toTime}</div>
                        </div>
                    </div>
                </motion.div>
                <div style={{ width: "60vw", backgroundColor: "gray", color: "white", padding: "20px" }}>
                    <p style={{ height: "40vh", overflow: "auto" }}>
                        {doc.description}
                    </p>
                    <style>
                        {`
        /* Customize the scrollbar for WebKit browsers */
        p::-webkit-scrollbar {
            width: 5px;
        }
        p::-webkit-scrollbar-track {
            background: transparent;
        }
        p::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
        }
        `}
                    </style>
                </div>


            </div>
            <div style={{ marginTop: "40px" }}>
                <div style={{ width: "1100px", display: "flex", flexDirection: "column", rowGap: "20px" }}>
                    <div>
                        <div style={{ marginRight: "20px", display: "inline-block" }}>
                            <input
                                type="time"
                                style={{
                                    marginBottom: "10px",
                                    height: "40px",
                                    padding: "0 10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    fontSize: "16px",
                                    outline: "none",
                                    width: "150px" // Adjust width as needed
                                }}
                                placeholder="Available Time"
                                name="fromTime"
                                value={timeData}
                                onChange={handleTime}
                                required
                            />
                        </div>
                        <div style={{ display: "inline-block", marginRight: "20px" }}>
                            <DatePicker
                                selected={startDate ? new Date(startDate) : null}
                                onChange={(date) => {
                                    if (date) {
                                        const isoString = date.toISOString();
                                        const dateOnly = isoString.split('T')[0];
                                        setStartDate(dateOnly);
                                    }
                                }}
                                style={{
                                    height: "40px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    fontSize: "16px",
                                    outline: "none",
                                }}
                            />
                        </div>

                        <div style={{ display: "inline-block", position: "relative", marginRight: "20px" }}>
                            <input
                                id="search"
                                style={{
                                    width: "300px",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    fontSize: "16px",
                                    outline: "none"
                                }}
                                placeholder="What are you suffering with?"
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                            />
                            {show && (
                                <div
                                    id="show_element"
                                    style={{
                                        top: "calc(100% + 0px)", // Add some space between input and dropdown
                                        minHeight: "100px",
                                        maxHeight: "200px", // Increase height to accommodate more items
                                        overflowY: "auto",
                                        width: "320px",
                                        position: "absolute",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        zIndex: 1000,
                                        fontSize: "16px"
                                    }}
                                >
                                    <div
                                        data-value={doc.expertise}
                                        style={{
                                            padding: "10px",
                                            borderBottom: "1px solid #eee",
                                            cursor: "pointer",
                                            transition: "background-color 0.3s",
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f1f1f1"}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
                                    >
                                        {doc.expertise}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: "inline-block" }}>
                            <select
                                onChange={(e) => setSelected(e.target.value)}
                                value={selected}
                                style={{
                                    width: "300px",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    fontSize: "16px",
                                    backgroundColor: "#fff",
                                    outline: "none",
                                    cursor: "pointer",
                                    appearance: "none", // Hide default dropdown arrow
                                    position: "relative",
                                }}
                            >
                                <option value="" disabled>Select one</option>
                                {
                                    diseases?.map((disease, idx) => (
                                        <option key={idx} value={disease}>
                                            {disease}
                                        </option>
                                    ))
                                }
                            </select>
                            {/* Custom arrow for better appearance */}
                            <div style={{
                                position: "absolute",
                                top: "50%",
                                right: "10px",
                                pointerEvents: "none",
                                transform: "translateY(-50%)",
                                fontSize: "16px",
                                color: "#888"
                            }}>
                                &#9662;
                            </div>
                        </div>

                    </div>
                    <div>
                        <textarea style={{ width: "100%" }} onChange={handleChangeDescription} value={description} name="description">

                        </textarea>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button
                            onClick={bookSlot}
                            style={{
                                padding: "4px 4px 4px 4px",
                                backgroundColor: "#4CAF50", // Green background
                                color: "white", // White text
                                border: "none",
                                borderRadius: "4px", // Rounded corners
                                cursor: "pointer",
                                fontSize: "16px",
                                fontWeight: "bold",
                                display: "inline-block",
                                textAlign: "center"
                            }}
                        >
                            Book Slot
                        </button>

                        <DNA
                            visible={showLoader}
                            height="60"
                            width="60"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                        <text style={{ marginLeft: "20px", color: status === "failure" ? "red" : "green" }}>{status !== "" && status}</text>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookAppointment;
