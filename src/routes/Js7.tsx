import React from "react";
import s from "../forJs7/Js7.module.css";
import { MdCheckBox } from "react-icons/md";

export default () => {
  return (
    <>
      <div className={s.top}>
        <div className={s.budget}>
          <div className={s.budget_title}>
            Available Budget in {""}
            <span className={s.budget_title_month}>June</span>
          </div>

          <div className={s.budget_value}>+10,000$</div>

          <div className={s.budget_income}>
            <div className={s.budget_income_text}>Income</div>
            <div className={s.income_result}>
              <div className={s.budget_income_value}>+ 30,000$</div>
              <div className={s.budget_income_percentage}>10%</div>
            </div>
          </div>

          <div className={s.budget_expenses}>
            <div className={s.budget_expenses_text}>Expenses</div>
            <div className={s.Expenses_result}>
              <div className={s.budget_expenses_value}>- 1,000$</div>
              <div className={s.budget_expenses_percentage}>0.3%</div>
            </div>
          </div>
        </div>
      </div>

      <div className={s.bottom}>
        <div className={s.add}>
          <div className={s.add_container}>
            <select className={s.add_type}>
              <option value="increase">+$</option>
              <option value="expense">-$</option>
            </select>

            <input
              type="text"
              className={s.add_description}
              placeholder="Input description"
            />

            <input type="number" className={s.add_value} placeholder="$" />

            <button className={s.add_btn}>
              <MdCheckBox />
            </button>
          </div>
        </div>

        <div className={s.spending_list}>
          <div className={s.income}>
            <h2 className={s.income_title}>income</h2>
            <div className={s.income_list}></div>
          </div>

          <div className={s.expense}>
            <h2 className={s.expense_title}>expense</h2>
            <div className={s.expense_list}></div>
          </div>
        </div>
      </div>
    </>
  );
};
