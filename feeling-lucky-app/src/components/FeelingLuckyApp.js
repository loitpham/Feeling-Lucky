import React from "react";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import AddOption from "./AddOption";
import OptionModal from "./OptionModal";

class FeelingLuckyApp extends React.Component {
    state = {
        // options: this.props.options,
        options: [],
        selectedOption: undefined
    }

    // Lifecycle methods: componentDidMount, componentDidUpdate, componentWillUnmount
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({options}));
            }
        } catch (e) {
            // Do nothing
            // Fall back on default data
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState( (prevState) => (
                { options: prevState.options.filter(option => option !== optionToRemove)}
            )
        );
    };

    handleDeleteOptions = () => {
        // need to wrap 'options' object with ()
        // otherwise, {} will be interpreted as function body
        this.setState( () => ( {options: []} ) );
    };

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState( () => ({selectedOption: option}) );
    };

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }
        this.setState( (prevState) => ( {options: prevState.options.concat([option])} ) );
    };

    handleClearSelectedOption = () => {
        this.setState( () => ({selectedOption: undefined}) );
    }

    render() {
        const subtitle = 'Let a random generator decide';

        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        options={this.state.options}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        );
    }
}

export default FeelingLuckyApp;