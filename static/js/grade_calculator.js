// grade_calculator.js

document.addEventListener("DOMContentLoaded", () => {
    const gradeForm = document.getElementById("grade-form");
    const gradeResult = document.getElementById("grade-result");
    const addRowBtn = document.getElementById("add-row");
    const calcRowsContainer = document.getElementById("calc-rows");
  
    // Function to add a new assignment row
    addRowBtn.addEventListener("click", () => {
      const newRow = document.createElement("div");
      newRow.classList.add("calc-row", "assignment-row");
      newRow.innerHTML = `
        <div class="calc-cell">
          <input
            type="text"
            class="assignment-name"
            name="assignmentName"
            placeholder="Assignment"
          />
        </div>
        <div class="calc-cell">
          <input
            type="number"
            class="assignment-earned"
            name="assignmentEarned"
            placeholder="Earned"
            required
          />
        </div>
        <div class="calc-cell">
          <input
            type="number"
            class="assignment-possible"
            name="assignmentPossible"
            placeholder="Possible"
            required
          />
        </div>
        <div class="calc-cell">
          <button type="button" class="remove-row">X</button>
        </div>
      `;
  
      calcRowsContainer.appendChild(newRow);
    });
  
    // Event delegation for removing a row
    calcRowsContainer.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("remove-row")) {
        // Remove the row
        const rowToRemove = e.target.closest(".assignment-row");
        if (rowToRemove) {
          rowToRemove.remove();
        }
      }
    });
  
    // Submit (Calculate) logic
    gradeForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      let totalEarned = 0;
      let totalPossible = 0;
  
      // Collect all rows
      const assignmentRows = document.querySelectorAll(".assignment-row");
      assignmentRows.forEach((row) => {
        const earnedInput = row.querySelector(".assignment-earned");
        const possibleInput = row.querySelector(".assignment-possible");
  
        const earned = parseFloat(earnedInput.value) || 0;
        const possible = parseFloat(possibleInput.value) || 0;
  
        totalEarned += earned;
        totalPossible += possible;
      });
  
      let percentage = 0;
      if (totalPossible > 0) {
        percentage = (totalEarned / totalPossible) * 100;
      }
  
      // Convert percentage to letter grade (basic scale)
      let letterGrade = "";
      if (percentage >= 90) {
        letterGrade = "A";
      } else if (percentage >= 80) {
        letterGrade = "B";
      } else if (percentage >= 70) {
        letterGrade = "C";
      } else if (percentage >= 60) {
        letterGrade = "D";
      } else {
        letterGrade = "F";
      }
  
      // Display the result
      gradeResult.innerHTML = `
        <h3>Your Grade</h3>
        <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>
        <p><strong>Letter Grade:</strong> ${letterGrade}</p>
      `;
    });
  });