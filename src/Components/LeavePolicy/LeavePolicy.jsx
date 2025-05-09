import React from 'react';
import styles from './LeavePolicy.module.css';
import { FaRegCalendarCheck, FaUserMd, FaExclamationTriangle, FaClipboardList } from 'react-icons/fa';

const LeavePolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Employee Leave Policy</h1>
      <p className={styles.intro}>
        To ensure consistency and fairness in the management of employee leave, the following regulations are being implemented. These guidelines apply to all employees, except where otherwise stated, or in case of emergency. Please note that any employee found using their leaves unfairly, unjustly, or otherwise will be given a warning. If an employee exceeds 3 warnings for any reason that brings losses to the company, there will be strict actions taken. The action could result in salary deduction, no raise, or in extreme cases, dismissal from the office.
      </p>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FaUserMd /> 1. Sick Leave
        </h2>
        <p>
          Each employee is entitled to <strong>20 sick leave days</strong> per calendar year. Sick leave can be taken when an employee is ill or has a medical condition that requires time off. A medical certificate may be requested if leave exceeds <strong>3 consecutive days</strong>.
        </p>
        <p>
          Keep in mind that there are <strong>20 sick leaves divided by 12 months</strong>. Unless there is a medical certificate justifying extra sick leaves, there will be deductions for the said leaves.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FaRegCalendarCheck /> 2. Paid Leave for Permanent Employees
        </h2>
        <p>
          Permanent employees are entitled to <strong>20 paid leave days</strong> per calendar year. Paid leave may be used for personal, vacation, or other reasons as deemed appropriate.
        </p>
        <p>
          A maximum of <strong>2 paid leave days</strong> can be taken per month, if you don’t have carry forward leaves.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FaClipboardList /> 3. Carry-Over of Paid Leave
        </h2>
        <p>
          If paid leave is not used within a given month, unused leave can be carried over to the following month. There is no limit to how many months paid leave can be accumulated; however, it must be used within the year.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FaExclamationTriangle /> 4. Planned Leave
        </h2>
        <p>
          Any bulk leave requests for more than <strong>4 consecutive days</strong> (e.g., for vacations or extended time off) must be submitted for approval at least <strong>1 or 2 months in advance</strong>. (Under the condition that you have the leave balance)
        </p>
        <p>
          This will allow the company to manage workflow and ensure adequate coverage during the employee's absence.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FaExclamationTriangle /> 5. Probationary Period Leave Restrictions
        </h2>
        <p>
          Employees on probation are not eligible to take paid leave until they successfully complete their probationary period and are confirmed as permanent employees. Probationary employees are entitled only to sick leave as per the sick leave policy.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FaExclamationTriangle /> 6. Excessive Absenteeism During Probation
        </h2>
        <p>
          If a probationary employee is absent excessively (i.e., more than what is considered reasonable for their probationary period), this may lead to a review of their employment status. Continued absenteeism may result in termination of employment.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          <FaExclamationTriangle /> 7. Sandwich Leave
        </h2>
        <p>
          If an employee takes leave on a <strong>Saturday and Monday</strong>, and the Sunday in between is not a holiday, this will be considered a sandwich leave. The employee will either have the Sunday deducted from their salary or counted as paid leave, depending on their leave balance and choice.
        </p>
      </div>

      <div className={styles.finalNotes}>
        <h2 className={styles.sectionTitle}>
          <FaExclamationTriangle /> Final Notes
        </h2>
        <p>
          Employees must submit leave requests through the designated company system or to their direct supervisor for approval. Leave is subject to company needs and staffing requirements, and approval may be based on availability.
        </p>
        <p>
          The company reserves the right to modify or amend the leave policy as necessary, with adequate notice to employees.
        </p>
      </div>
    </div>
  );
};

export default LeavePolicy;