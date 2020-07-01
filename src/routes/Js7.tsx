import React from "react";
import s from "../forJs7/Js7.module.css";

export default () => {
  return (
    <>
      <div className={s.top}>
        <div className={s.budget}>
          <div className={s.budget_title}>
            Available Budget in{" "}
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
    </>
  );
};
