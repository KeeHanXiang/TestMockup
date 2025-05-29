import React, { useState } from "react";

const expenseCategories = [
  {
    title: "(1) LIVING EXPENSES",
    color: "#d4e9cd",
    editable: "LMF_P1",
    items: [
      { code: "512010", name: "1(a) Living Expense" },
      { code: "512020", name: "1(b) Personal Allowance" },
      { code: "512030", name: "1(c) Single Person Supplement" },
    ],
  },
  {
    title: "(2) ROUTINE EXPENSES",
    color: "#cfe2f3",
    editable: "LMF_P1",
    items: [
      { code: "512310", name: "2(a) Household Help Wages" },
      { code: "512311", name: "2(b) Work Travel" },
      { code: "512312", name: "2(c) Other Routine Expenses" },
      { code: "512510", name: "2(d) Vacation Allowance" },
    ],
  },
  {
    title: "(3) HOUSING EXPENSES",
    color: "#f9cb9c",
    editable: "LMF_P1",
    items: [
      { code: "512610", name: "3(a) Rent/Housing" },
      { code: "512611", name: "3(b) Utilities" },
      { code: "512615", name: "3(c) Management Fees/Repairs & Maintenance" },
    ],
  },
  {
    title: "(4) CURRENT EXPENSES",
    color: "#f4cccc",
    editable: "LMF_P1",
    items: [
      { code: "512210", name: "4(a) Medical Expenses and Medical Insurance" },
      { code: "512314", name: "4(b) Visa & Work Permit, Passport" },
      { code: "512316", name: "4(c) Partner Organization Fees" },
      { code: "512318", name: "4(d) Bank Charges/ATM Fees" },
      {
        code: "512319",
        name: "4(e) Professional Membership Fees & Subscription",
      },
      {
        code: "512410",
        name: "4(f) Pre School, Primary & High School Education",
      },
      { code: "513110", name: "4(g) Orientation, Language & Culture Learning" },
      { code: "513210", name: "4(h) Set up & Moving Costs" },
      {
        code: "",
        name: "4(i) Income Tax or Local Tax levied in courtesy of service",
      },
      { code: "521010", name: "4(j) Training & Member Development" },
      { code: "521510", name: "4(k) Annual Sector Conference & Travel" },
      { code: "521510", name: "4(l) Additional Conference Costs" },
      { code: "512315", name: "4(n) Additional Ministry Expenses" },
      { code: "512515", name: "4(o) Additional Vacation Expenses" },
    ],
  },
  {
    title: "(5) SAVINGS ITEMS",
    color: "#e3fcef",
    editable: "LMF_P1",
    items: [
      { code: "512320", name: "5(a) IT Equipment" },
      { code: "512330", name: "5(b) Other Ministry Equipment" },
      { code: "512620", name: "5(c) Furniture" },
      { code: "521020", name: "5(e) Personal Study & Development" },
      { code: "513000", name: "5(f) Home Assignment Travel" },
    ],
  },
  {
    title: "(6) PRIORITY 2",
    color: "#fce5cd",
    editable: "LMF_P2",
    items: [
      { code: "512335", name: "5(b) Other Ministry Equipment" },
      { code: "512345", name: "5(d) Vehicle Purchase" },
    ],
  },
];

const greyedOutCellStyle = {
  backgroundColor: "#f0f0f0",
};

const CBAnnualEstimateForm = () => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (code, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [code]: {
        ...prev[code],
        [field]: value,
      },
    }));
  };

  const getCategoryTotal = (category, field) => {
    return category.items
      .reduce((sum, item) => {
        const val = parseFloat(formData[item.code]?.[field]);
        return sum + (isNaN(val) ? 0 : val);
      }, 0)
      .toFixed(2);
  };

  const getRowSubtotal = (code) => {
    const p1 = parseFloat(formData[code]?.LMF_P1) || 0;
    const p2 = parseFloat(formData[code]?.LMF_P2) || 0;
    return (p1 + p2).toFixed(2);
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h2>CB Annual Estimate Summary Sheet (2022)</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "300px",
          }}
        >
          <label style={{ marginBottom: "0.5rem" }}>
            Family ID: <input type="text" style={{ width: "100%" }} />
          </label>
          <label>
            Account Name: <input type="text" style={{ width: "100%" }} />
          </label>
        </div>
        <div style={{ textAlign: "right" }}>
          <label>
            Date: <input type="date" />
          </label>
        </div>
      </div>

      <table
        border="1"
        cellPadding="5"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Account Code</th>
            <th>Category</th>
            <th>Sub-totals</th>
            <th>LMF_P1</th>
            <th>LMF_P2</th>
          </tr>
        </thead>
        <tbody>
          {expenseCategories.map((category) => (
            <React.Fragment key={category.title}>
              <tr>
                <td
                  colSpan="5"
                  style={{
                    backgroundColor: category.color,
                    fontWeight: "bold",
                    padding: "0.5rem",
                  }}
                >
                  {category.title}
                </td>
              </tr>
              {category.items.map((item, index) => (
                <tr key={item.code + item.name + index}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td style={{ textAlign: "right" }}>
                    {getRowSubtotal(item.code)}
                  </td>
                  <td
                    style={
                      category.editable !== "LMF_P1"
                        ? greyedOutCellStyle
                        : undefined
                    }
                  >
                    {category.editable === "LMF_P1" && (
                      <input
                        type="number"
                        value={formData[item.code]?.LMF_P1 || ""}
                        onChange={(e) =>
                          handleInputChange(item.code, "LMF_P1", e.target.value)
                        }
                        style={{ width: "100%", boxSizing: "border-box" }}
                      />
                    )}
                  </td>

                  <td
                    style={
                      category.editable !== "LMF_P2"
                        ? greyedOutCellStyle
                        : undefined
                    }
                  >
                    {category.editable === "LMF_P2" && (
                      <input
                        type="number"
                        value={formData[item.code]?.LMF_P2 || ""}
                        onChange={(e) =>
                          handleInputChange(item.code, "LMF_P2", e.target.value)
                        }
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan="2"
                  style={{
                    fontStyle: "italic",
                    padding: "0.5rem",
                    textAlign: "right",
                  }}
                >
                  Total for {category.title}
                </td>
                <td></td>
                <td style={{ fontWeight: "bold", textAlign: "right" }}>
                  {getCategoryTotal(category, "LMF_P1")}
                </td>
                <td style={{ fontWeight: "bold", textAlign: "right" }}>
                  {getCategoryTotal(category, "LMF_P2")}
                </td>
              </tr>
              <tr><td colSpan="5" style={{ height: "10px" }}></td></tr>

            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CBAnnualEstimateForm;
