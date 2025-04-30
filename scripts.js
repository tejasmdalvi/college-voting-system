document.addEventListener("DOMContentLoaded", function () {
    console.log(" scripts.js loaded");

    //  Hide results box on load
    const resultBox = document.getElementById("resultBox");
    resultBox.style.display = "none";
    resultBox.innerHTML = "";

    var API_ENDPOINT = "https://cr1x79w6mi.execute-api.us-east-2.amazonaws.com/prod";

    // Use localStorage to persist student votes
    const usedStudentIds = new Map(JSON.parse(localStorage.getItem("usedVotes") || "[]"));

    // Enforce only 5-digit numeric input
    document.getElementById("studentId").addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, '').slice(0, 5);
    });

    function confirmVote() {
        const studentId = document.getElementById('studentId').value.trim();
        const selectedCandidate = document.getElementById('candidateSelect').value;

        if (!/^\d{5}$/.test(studentId)) {
            showMessage(" Please enter a valid 5-digit student ID.", "error");
            return false;
        }

        // Check eligibility
        const numericId = parseInt(studentId, 10);
        const isMechanical = numericId >= 10000 && numericId <= 19999;
        const isComputer = numericId >= 50000 && numericId <= 59999;
        const isIt = numericId >= 20000 && numericId <= 29999;
        const isElectrical = numericId >= 70000 && numericId <= 79999;
        const isChemical = numericId >= 80000 && numericId <= 89999;

        if (!isMechanical && !isComputer && !isIt && !isElectrical && !isChemical) {
            showMessage(" Your student ID is not eligible to vote in this election.", "error");
            return false;
        }

        if (!selectedCandidate) {
            showMessage(" Please select a candidate.", "error");
            return false;
        }

        if (usedStudentIds.has(studentId)) {
            const previousVote = usedStudentIds.get(studentId);
            showMessage(` You have already voted for ${previousVote}. You cannot vote again.`, "error");
            return false;
        }

        console.log(" confirmVote() was triggered");

        if (confirm(` You selected ${selectedCandidate}. Confirm vote?`)) {
            $.ajax({
                url: API_ENDPOINT,
                type: 'POST',
                data: JSON.stringify({
                    studentId: studentId,
                    candidate_name: selectedCandidate
                }),
                contentType: 'application/json',
                success: function (response) {
                    usedStudentIds.set(studentId, selectedCandidate);
                    localStorage.setItem("usedVotes", JSON.stringify(Array.from(usedStudentIds.entries())));
                    showMessage(` Your vote for ${selectedCandidate} has been successfully cast!`, "success");
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                    showMessage(" Failed to submit vote. Please try again later.", "error");
                }
            });
        }

        return false;
    }

    function selectCandidate(name) {
        document.getElementById("candidateSelect").value = name;
    }

    function showMessage(message, type) {
        const box = document.getElementById("messageBox");
        box.innerHTML = `
            <div class="message-box" style="background-color: ${type === 'error' ? '#ffdddd' : '#d4edda'}; 
            border: 1px solid ${type === 'error' ? '#ff5c5c' : '#28a745'}; 
            color: ${type === 'error' ? '#a94442' : '#155724'};">
                ${message}
            </div>
        `;
    }

    function viewResults() {
        console.log(" viewResults() called");
        const inputCode = prompt(" Enter admin access code to view results:");
        
        const actualPassword = "admin123";
        if (inputCode !== actualPassword) {
            alert(" Invalid access code.");
            return;
        }
    
        alert("Access granted! ");
        $.ajax({
            url: API_ENDPOINT,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                const data = typeof response === 'string' ? JSON.parse(response) : response;
                const results = {};
        
                data.forEach(entry => {
                    if (results[entry.candidate_name]) {
                        results[entry.candidate_name]++;
                    } else {
                        results[entry.candidate_name] = 1;
                    }
                });
        
                const sortedResults = Object.entries(results)
                    .sort((a, b) => b[1] - a[1])
                    .map(([name, count], index) => `${index + 1}. ${name}: ${count} vote${count !== 1 ? 's' : ''}`);
        
                const resultBox = document.getElementById("resultBox");
                resultBox.innerHTML = `<h3> Election Results:</h3><p>${sortedResults.join("<br>")}</p>`;
                resultBox.style.display = "block";
            },
            error: function () {
                alert(" Error retrieving vote data.");
            }
        });
        
    }
    
    
    // 🌐 Expose functions globally for HTML to use
    window.confirmVote = confirmVote;
    window.selectCandidate = selectCandidate;
    window.viewResults = viewResults;
});
