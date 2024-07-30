import { useNavigate } from "react-router-dom"
import "./Main.css"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import doctor from "../images/doctor.jpeg"
import { setList } from "../../redux-store/slices/listOfExpertise";
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import About from "../About"
function Main() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const inputRef = useRef()
    const [btnColor, setBtnColor] = useState("black");

    const [doctors, setDoctors] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState({
        expertise: [], doctors: []
    })
    const [searchType, setSearchType] = useState("doctor");
    useEffect(() => {
        console.log(searchType)
    }, [searchType])
    useEffect(() => {
        const handleSearchBarClick = (e) => {
            console.log("clicked");
            const { target } = e;
            const element = document.getElementById("service");

            if (inputRef.current === target || element?.contains(target)) {
                if (element?.contains(target) && target && target.dataset && target.dataset.value) {
                    console.log(target.dataset.value);
                    setSearchText(target.dataset.value)
                }
                setShowResults(true);
            } else {
                setShowResults(false);
            }
        };

        window.addEventListener("click", handleSearchBarClick);
        return () => window.removeEventListener("click", handleSearchBarClick);
    }, []);

    const handleBtnClick = (doc) => {
        setBtnColor("lightgreen");
        navigate(`/BookAppointment?name=${doc.name}`, { state: { docinfo: doc } })
        console.log(doc)
    };

    useEffect(() => {
        const handleClick = () => {
            // Scroll to the end of the page
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth" // Optional, smooth scrolling
            });
        }
        document.getElementById("aboutButton")?.addEventListener("click", handleClick);
    }, [])

    useEffect(() => {
        console.log(searchText === "" ? "empty" : searchText)
        if (searchText === "") {
            if (searchType === "doctor") {
                setResults(searchResults["doctors"])
                console.log(searchResults['doctors'])
            }
            else if (searchType === "disease") {
                setResults(searchResults["expertise"])
                console.log(searchResults['expertise'])
            }
        }
        else {
            if (searchType === "doctor") {
                setResults(searchResults?.doctors.filter((result) => result?.includes(searchText)))
                console.log(searchResults?.doctors.filter((result) => result?.includes(searchText)))
            } else if (searchType === "disease") {
                setResults(searchResults?.expertise.filter((result) => result?.includes(searchText)))
                console.log(searchResults?.expertise.filter((result) => result?.includes(searchText)))
            }
        }

    }, [searchText, searchResults, searchType])
    useEffect(() => {
        async function getInfo() {
            fetch("https://doctorsite-backend.onrender.com/doc/info")
                .then((response) => response.json())
                .then(data => {
                    console.log(data)
                    setDoctors(data["data"])
                    const expertiseList = data["data"]?.map((doc) => doc.expertise)
                    const doctorsList = data["data"]?.map((doc) => doc.name)
                    dispatch(setList({ list: expertiseList }));
                    console.log({ expertise: expertiseList, doctors: doctorsList })
                    setSearchResults({ expertise: expertiseList, doctors: doctorsList })
                })
                .catch(err => console.log(err))
        }
        getInfo()
    }, [])
    async function logout() {
        fetch("https://doctorsite-backend.onrender.com/pat/logout", {
            credentials: "include"
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data)
            toast.success(data.message)
            navigate("/")
        })
            .catch(err => {
                toast.error("error while logging out")
                console.log(err)
            })
    }
    useEffect(() => {
        console.log(doctors)
    }, [doctors])
    return (
        <div className="main">
            <header className="header">
                <div
                    className="services-div"
                    style={{
                        flex: 1,
                        // backgroundColor:"blue"
                    }}>
                    <button
                        onClick={() => navigate("/feedback")}
                        style={{
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontSize: "16px",
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                        Feedback
                    </button>
                </div>
                <div
                    className="search-div"
                    style={{
                        flex: 2,
                    }}>
                    <div>
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            style={{
                                // padding: "10px",
                                borderRadius: "4px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                                cursor: "pointer",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                transition: "border-color 0.3s, box-shadow 0.3s",
                                width: "150px", // Adjust width as needed
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "#007bff"; // Change border color on focus
                                e.target.style.boxShadow = "0 0 4px rgba(0, 123, 255, 0.5)"; // Add shadow on focus
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "#ccc"; // Reset border color on blur
                                e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"; // Reset shadow on blur
                            }}
                        >
                            <option value="" disabled>Select one</option>
                            <option value="doctor">Doctor</option>
                            <option value="disease">Disease</option>
                        </select>

                    </div>
                    <div style={{ position: "relative" }}>
                        <input
                            ref={inputRef}
                            style={{
                                padding: "3px 3px 3px 3px",
                                borderRadius: "4px",
                                border: "none",
                                width: "300px"
                            }}
                            placeholder="search for doctor/disease"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        {
                            showResults && (results.length !== 0 ? (
                            <div
                                id={"service"}
                                style={{
                                    padding: "0px 0px 3px 0px",
                                    border: "none",
                                    borderRadius: "4px",
                                    height: "auto",
                                    width: "100%",
                                    position: 'absolute',
                                    top: "30px",
                                    backgroundColor: "gray",
                                    color: "white"
                                }}>
                                {
                                    results?.map((service, idx) => {
                                        return (<div key={idx} data-value={service} style={{borderBottom:idx!==results.length-1 && "1px solid white", marginLeft: "10px", marginTop: "3px", borderTopColor: "white" }}>
                                            {service}
                                        </div>)
                                    })
                                }
                                {/* <div style={{marginLeft:"10px"}}>
                                    no results
                                </div> */}
                            </div>) : (
                                <div style={{
                                    padding: "3px 0px 3px 0px",
                                    border: "none",
                                    borderRadius: "4px",
                                    height: "auto",
                                    width: "100%",
                                    position: 'absolute',
                                    bottom: "-30px",
                                    backgroundColor: "gray",
                                    color: "white"
                                }}>
                                    <div style={{ marginLeft: "10px" }}>
                                        no results
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div
                    className="about"
                    style={{
                        flex: 1,
                    }}>
                    <div>&#x2022;
                        <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/")} >home</span>
                    </div>
                    <div id={"aboutButton"}>&#x2022;
                        <span style={{ textDecoration: "underline", cursor: "pointer" }}>about</span>
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontSize: "16px",
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#c82333"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#dc3545"}
                    >
                        Logout
                    </button>
                </div>
            </header>
            {/* <div 
                className="sidebar"
            style={{
                position:'fixed',
                overflow:"auto",
                backgroundColor:"#1E3A5F",
                width:"180px",
                height:"100vh",
                color:"white"
            }}>
                <div style={{marginBottom:"100px",zIndex:999}}>
                    <h2>Doctors List</h2>
                    <ul>
                        <li>l1</li>
                        <li>l2</li>
                        <li>l3</li>
                    </ul>
                </div>
                <div>
                    <h2>services</h2>
                    <ul>
                        <li>l1</li>
                        <li>l2</li>
                        <li>l3</li>
                    </ul>
                </div>
            </div> */}
            <div className="body-div">
                {
                    doctors?.map((doc, idx) => {
                        return (results.includes(doc.expertise) || results.includes(doc.name)) && (<motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            style={{ height: '330px', backgroundColor: "gray", color: "white", boxShadow: "0 4px 8px rgba(0,0,0,0.9)" }}
                            key={idx}>
                            <div style={{ backgroundColor: "white", height: "170px" }}>
                                {console.log(doc.image_of_doctor)}
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={doc.image_of_doctor === "" ?
                                    doctor : `https://doctorsite-backend.onrender.com/uploads/${doc.image_of_doctor}`} alt={"doc"} />
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
                            {
                                searchText && (<button
                                    style={{
                                        marginTop: "20px",
                                        color: "#fff", // Text color
                                        backgroundColor: "green", // Background color
                                        border: "1px solid #007bff", // Border color matching background
                                        borderRadius: "8px", // Rounded corners
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Slightly softer shadow
                                        width: "300px",
                                        padding: "10px 0", // Increased padding for better click area
                                        fontSize: "16px", // Larger text for readability
                                        fontWeight: "bold", // Bold text
                                        textTransform: "uppercase", // Uppercase text for emphasis
                                        cursor: "pointer", // Pointer cursor on hover
                                        transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition
                                        display: "inline-block", // Ensures proper alignment
                                    }}
                                    onClick={() => handleBtnClick(doc)}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"} // Darker background on hover
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "green"} // Original background on leave
                                >
                                    Book Appointment
                                </button>
                                
                                )
                            }
                        </motion.div>)
                    })
                }
            </div>
            <div style={{ marginTop: "60px", padding: "20px 20px 20px 20px", backgroundColor: "lightgray" }}>
                <h1 style={{ textAlign: "center" }}>About This Website</h1>
                <About />
                <h1>
                    creator:mahesh tupakula
                </h1>
            </div>
        </div>
    )
}
export default Main;