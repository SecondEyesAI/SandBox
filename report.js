// SecondEyes AI – Web Version (No Sheets, No API Key Needed for Demo)
function generateReport() {
  const reportDiv = document.getElementById("report-output");
  reportDiv.innerHTML = `
    <div class="container mt-5 p-4 border rounded bg-light">
      <h1 class="text-center text-primary">B T D Baxter Technical Dynamics</h1>
      <h2 class="text-center">ASSET EXTERNAL & INTERNAL INSPECTION REPORT</h2>
      <hr>
      
      <table class="table table-bordered">
        <tr class="bg-secondary text-white"><th>Client</th><th>Location</th><th>Date</th></tr>
        <tr><td>[Your Client]</td><td>[Site Name]</td><td>${new Date().toLocaleDateString()}</td></tr>
      </table>

      <h3>Scope</h3>
      <p>Visual inspection of welds using AI analysis.</p>

      <h3>Digital Camera Photos</h3>
      <div class="row">
        <div class="col-md-6 border p-2">
          <img src="https://via.placeholder.com/300x200?text=Weld+1" class="img-fluid">
          <p class="text-center"><strong>Caption:</strong> Good weld</p>
        </div>
        <div class="col-md-6 border p-2">
          <img src="https://via.placeholder.com/300x200?text=Weld+2" class="img-fluid">
          <p class="text-center"><strong>Caption:</strong> Minor porosity</p>
        </div>
      </div>

      <h3 class="mt-4">Findings</h3>
      <ul>
        <li>All welds within tolerance.</li>
        <li>No cracks detected.</li>
      </ul>

      <h3>Recommendations</h3>
      <ol>
        <li>Monitor Weld 2 in 6 months.</li>
        <li>Continue routine inspections.</li>
      </ol>

      <p class="text-end mt-4"><strong>Signed:</strong> SecondEyes AI</p>
    </div>
  `;
}