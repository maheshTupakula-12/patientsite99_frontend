import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./Feedback.css"

function Feedback(){
    const {state} = useLocation();
    const [doctorList,setDoctorList] = useState([]);
    useEffect(()=>{
        setDoctorList(state.list);
        console.log(state.list)
    },[])
    const [feedback,setFeedback] = useState({
        disease:"",
        doctor:"",
        opinion:"",
        description:"",
        rating:0,
    });
    const handleInputChange = (e)=>{
        setFeedback({...feedback,[e.target.name]:e.target.value});
    }

    useEffect(()=>{
        console.log(feedback)
    },[feedback])
   
    const feedbackData = (e)=>{
        e.preventDefault();
        fetch("https://doctorsite-backend.onrender.com/pat/feedback",{
            method:"post",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem("email"),
                feedback:{...feedback,mail:localStorage.getItem("email")}
            }),
            credentials:"include"
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            setFeedback({
                disease:"",
                doctor:"",
                opinion:"",
                description:"",
                rating:0,
            })
            toast.success("feedback form recieved")
        })
        .catch(err=>{
            console.log(err)
            toast.error(err.message)
        })
    }
    return (
        <div
        style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa", // Light background color for the whole page
    }}
>
    <div
        style={{
            padding: "40px",
            backgroundColor: "#fff", // White background for the form container
            borderRadius: "8px", // Rounded corners for the form container
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Soft shadow for the container
            width: "100%",
            maxWidth: "600px", // Limit the max width of the form container
        }}
    >
        <form
            style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "20px", // Space between form elements
            }}
            onSubmit={feedbackData}
        >
            <h1 style={{ marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>
                Feedback Form
            </h1>
            
            <input
                type="text"
                onChange={handleInputChange}
                value={feedback.disease}
                name="disease"
                placeholder="Disease facing"
                required
                style={{
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                }}
            />
            
            <select value={feedback.doctor} onChange={handleInputChange} name="doctor" >
                <option value="">select doctor</option>
                {
                    doctorList?.map((doctor,_)=>(<option value={doctor.id} key={doctor.doctor_id}>{doctor.doctor_name}</option>))
                }
            </select>

            {/* <input
                type="text"
                onChange={handleInputChange}
                value={feedback.doctor}
                name="doctor"
                placeholder="Doctor name"
                required
                style={{
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                }}
            /> */}
            
            <input
                type="text"
                onChange={handleInputChange}
                value={feedback.opinion}
                name="opinion"
                placeholder="Opinion in short"
                required
                style={{
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                }}
            />
            
            <textarea
                onChange={handleInputChange}
                value={feedback.description}
                name="description"
                placeholder="Detailed description"
                rows="4"
                style={{
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                    resize: "vertical", // Allow vertical resizing only
                }}
            />
            
            <input
                type="number"
                onChange={handleInputChange}
                value={feedback.rating}
                name="rating"
                placeholder="Please provide rating (1-5)"
                required
                style={{
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                }}
            />
            
            <div style={{ textAlign: "right" }}>
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        borderRadius: "4px",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        fontSize: "16px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"} // Darker blue on hover
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"} // Original blue on leave
                >
                    Submit
                </button>
            </div>
        </form>
    </div>
</div>

    )
}
export default Feedback;