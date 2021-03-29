import Option from "./Option";
import React from "react";

const Options = (props) => (
    <div>
        <div className="widget-header">
            <h3 className="widget-header__title">Your Options</h3>
            <button
                className="button button__link"
                disabled={props.options.length <= 0}
                onClick={props.handleDeleteOptions}
            >
                Remove All
            </button>
        </div>
        {props.options.length === 0 && <p className="widget__message">Please enter an option to get started!</p>}
        <ol>
            {
                props.options.map((option, index) => (
                        <Option
                            key={option}
                            optionText={option}
                            count={index + 1}
                            handleDeleteOption={props.handleDeleteOption}
                        />
                    )
                )
            }
        </ol>
    </div>
);


export default Options;