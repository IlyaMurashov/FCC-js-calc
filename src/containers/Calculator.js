import React from "react";
import {InputWindow} from "../components/InputWindow";
import {Button} from "../components/Button";
import {ExpressionWindow} from "../components/ExpressionWindow";

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expression: '',
      input: '',
      equalsShown: false,
      dotUsed: false,
      lastIsOperator: false
    };

    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleDotClick = this.handleDotClick.bind(this);
  }

  handleNumberClick(num) {
    if (this.state.equalsShown) {
      this.setState({
        expression: '',
        input: '',
        equalsShown: false
      });
    }

    switch (this.state.input) {
      case '':
      case '0':
        this.setState({input: num});
        break;

      case '+':
      case '-':
      case '*':
      case '/':
        this.setState(prevState => ({
          expression: prevState.expression + prevState.input,
          input: num
        }));
        break;

      default:
        this.setState(prevState => ({input: prevState.input + num}));
    }
  }

  handleOperatorClick(operator) {
    this.setState({dotUsed: false});

    if (this.state.equalsShown) {
      this.setState(prevState => ({
        expression: prevState.input,
        input: '',
        equalsShown: false
      }));
    }

    switch (this.state.input) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState({input: operator});
        break;

      default:
        this.setState(prevState => ({
          expression: prevState.expression + prevState.input,
          input: operator
        }));
    }
  }

  handleEquals() {
    if (this.state.equalsShown) return;

    switch (this.state.input) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState(prevState => ({
          expression: prevState.expression + '=',
          input: eval(prevState.expression).toString(),
          equalsShown: true,
          dotUsed: false
        }));
        break;

      default:
        this.setState(prevState => ({
          expression: prevState.expression + prevState.input + '=',
          input: eval(prevState.expression + prevState.input).toString(),
          equalsShown: true,
          dotUsed: false
        }));
    }
  }

  handleDotClick() {
    if (this.state.dotUsed || this.state.equalsShown) return;

    switch (this.state.input) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState(prevState => ({
          expression: prevState.expression + prevState.input,
          input: '.',
          dotUsed: true
        }));
        return;

      default:
        this.setState(prevState => ({
          input: prevState.input + '.',
          dotUsed: true
        }));
    }
  }

  render() {
    return (
      <div className="calc__body">
        <div className="calc__display">
          <ExpressionWindow toDisplay={this.state.expression}/>
          <InputWindow toDisplay={this.state.input}/>
        </div>
        <div className="calc__keyboard">
          <Button value="AC" delete handleBtnClick={() => console.log('AC')}/>
          <Button value="CE" delete handleBtnClick={() => console.log('CE')}/>
          <Button value="Ret" delete handleBtnClick={() => console.log('Ret')}/>
          <Button value="/" operator handleBtnClick={this.handleOperatorClick}/>

          <Button value="7" handleBtnClick={this.handleNumberClick}/>
          <Button value="8" handleBtnClick={this.handleNumberClick}/>
          <Button value="9" handleBtnClick={this.handleNumberClick}/>
          <Button value="*" operator handleBtnClick={this.handleOperatorClick}/>

          <Button value="4" handleBtnClick={this.handleNumberClick}/>
          <Button value="5" handleBtnClick={this.handleNumberClick}/>
          <Button value="6" handleBtnClick={this.handleNumberClick}/>
          <Button value="-" operator handleBtnClick={this.handleOperatorClick}/>

          <Button value="1" handleBtnClick={this.handleNumberClick}/>
          <Button value="2" handleBtnClick={this.handleNumberClick}/>
          <Button value="3" handleBtnClick={this.handleNumberClick}/>
          <Button value="+" operator handleBtnClick={this.handleOperatorClick}/>

          <Button value="0" handleBtnClick={this.handleNumberClick}/>
          <Button value="." handleBtnClick={this.handleDotClick}/>
          <Button value="=" equals handleBtnClick={this.handleEquals}/>
        </div>
      </div>
    );
  }
}
