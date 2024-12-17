//not use
import { React, useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

export default function CreateNewSurvey() {


    const [showPollOptions, setShowPollOptions] = useState(false); // State to control the visibility of Question Nos
    const [pollOptions, setPollOptions] = useState(['']); // Initial Question Nos with two empty strings

    const handlePollOptionChange = (index, value) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const handleAddOption = () => {
        setPollOptions([...pollOptions, '']);
    };

    const handleCreatePoll = () => {
        setShowPollOptions(true);
    };


    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='w-50'>

                <h5 className='w-100 text-center bg-danger'>Create a Survey Here..</h5>
                <br></br>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Enter a Survey Title"

                    />

                </InputGroup>


                <br></br>
                {/* Survey Description Input */}
                {/* <InputGroup className="mb-3">
                    <FormControl
                        as="textarea"
                        rows={3}
                        placeholder="Enter a Survey Description"
                        value={surveyDescription}
                        onChange={(e) => setSurveyDescription(e.target.value)}
                    />
                </InputGroup>

                <br></br> */}
                <Button variant="danger" className="ms-auto w-100 mb-5" onClick={handleCreatePoll} style={{ backgroundColor: "#ff004e" }}>Click to Create Survey Question</Button>
                {showPollOptions && pollOptions.map((option, index) => (
                    <InputGroup className="mb-3" key={index}>
                        <FormControl
                            placeholder={`Question No ${index + 1}`}
                            value={option}
                            onChange={(e) => handlePollOptionChange(index, e.target.value)}
                            aria-label={`Question No ${index + 1}`}
                        />
                        {index === pollOptions.length - 1 && (
                            <Button variant="outline-secondary" onClick={handleAddOption}>+</Button>
                        )}
                    </InputGroup>
                ))}




                <div className="mt-3">
                    <button type="button" className=" w-100 btn btn-lg text-white py-2 px-5 rounded-0" style={{ backgroundColor: "#ff004e" }}>Submit Survey</button>
                    <button type='button' style={{ width: "200px" }} className=" mb-3" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
