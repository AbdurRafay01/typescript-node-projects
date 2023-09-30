// calculator using chalk inquirer

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { stdout } from "process";

class Calculator {
  input_flag: boolean;

  constructor() {
    // flag used in input_number function for message switching
    this.input_flag = true;
    console.log("Constructing calculator instance");
  }

  /**
   * run
   */
  public run(first_time: boolean = false) {
    // stdout title
    if (first_time) {
      const rainbow_title = chalkAnimation.rainbow("Welcome to the calculator");
      rainbow_title.start();
    }
    console.log(chalk.red("Pick action to proceed!"));
    // main
    this.handle_prompt();
  }

  private async input_number(): Promise<number> {
    const promptResult = await inquirer
      .prompt({
        type: "input",
        name: "answer",
        message: () => {
          if (this.input_flag) {
            this.input_flag = false;
            return "first number:";
          } else {
            this.input_flag = true;
            return "second number";
          }
        },
      })
      .then((prompt) => {
        return prompt.answer;
      });
    return parseInt(promptResult);
  }

  private handle_prompt(): void {
    inquirer
      .prompt({
        type: "list",
        name: "action",
        choices: ["add", "sub", "mul", "div", "quit"],
      })
      .then((answer) => {
        console.log(`action: ${answer.action}`);
        switch (answer.action) {
          case "add":
            this.add();
            break;
          case "sub":
            this.sub();
            break;
          case "mul":
            this.mul();
            break;
          case "div":
            this.div();
            break;
          case "quit":
            console.log(chalk.yellow("Exiting..."));
            stdout;
            break;
          default:
            console.log(chalk.red("Please select a valid option!"));
            break;
        }
      });
  }
  /**
   * add
   */
  public async add() {
    let num1: number = await this.input_number();
    let num2: number = await this.input_number();
    console.log(typeof num1);
    console.log(typeof num2);
    console.log(chalk.green(`Result ${num1 + num2}`));
    this.run();
    // console.log(num2);
  }

  /**
   * sub
   */
  public async sub() {
    let num1: number = await this.input_number();
    let num2: number = await this.input_number();
    console.log(chalk.green(`Result ${num1 - num2}`));
    this.run();
    // console.log(num2);
  }

  /**
   * mul
   */
  public async mul() {
    let num1: number = await this.input_number();
    let num2: number = await this.input_number();
    console.log(chalk.green(`Result ${num1 * num2}`));
    this.run();
    // console.log(num2);
  }

  /**
   * div
   */
  public async div() {
    let num1: number = await this.input_number();
    let num2: number = await this.input_number();
    console.log(chalk.green(`Result ${num1 / num2}`));
    this.run();
    // console.log(num2);
  }
}

const calculator = new Calculator();

calculator.run(true);
