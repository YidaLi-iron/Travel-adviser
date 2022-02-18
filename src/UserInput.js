import './App.css';

import './App.css';

function UserInput() {
    return (
        <div className="footer">
            <form className="user-input-form">
                <div className="button">
                    <button>submit</button>
                </div>
                <div className="user-input-box">
                    <div className="user-input-box1">
                        <div>
                            <label className="label1" htmlFor="currentLocation">Current location</label>
                            <input id="currentLocation" className="Input"/>
                        </div>
                        <div>
                            <label className="label2" htmlFor="startingDate">Starting date</label>
                            <input id="startingDate" className="Input"/>
                        </div>
                    </div>
                    <div className="user-input-box2">
                        <div>
                            <label className="label1" htmlFor="dest1">Destination1</label>
                            <input id="dest1" className="Input"/>
                        </div>
                        <div>
                            <label className="label2" htmlFor="dest2">Destination2</label>
                            <input id="dest2" className="Input"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserInput;