function generateReport() {
  // Collect form values
  const client = document.getElementById('client').value;
  const location = document.getElementById('location').value;
  const date = document.getElementById('date').value || new Date().toLocaleDateString();
  const asset = document.getElementById('asset').value;
  const material = document.getElementById('material').value;
  const scope = document.getElementById('scope').value;
  const summary = document.getElementById('summary').value;
  const image1 = document.getElementById('image1').value || 'https://via.placeholder.com/300x200?text=Weld+1';
  const image2 = document.getElementById('image2').value || 'https://via.placeholder.com/300x200?text=Weld+2';
  const defects = document.getElementById('defects').value.split('\n');
  const compliance = document.getElementById('compliance').value;
  const actions = document.getElementById('actions').value;
  const overall = document.getElementById('overall').value;

  // Build report HTML
  const reportDiv = document.getElementById('report-output');
  reportDiv.innerHTML = `
    <div class="container mt-5 p-4 border rounded bg-light text-dark">
      <h1 class="text-center text-primary">B T D Baxter Technical Dynamics</h1>
      <h2 class="text-center">ASSET EXTERNAL & INTERNAL INSPECTION REPORT</h2>
      <p class="text-center">FORM INS.01.00 | REV. 0 | Page 1 of 1</p>
      <hr>

      <table class="table table-bordered">
        <thead class="bg-secondary text-white">
          <tr><th>Client</th><th>Location/Facility</th><th>Date of Inspection</th></tr>
        </thead>
        <tbody>
          <tr><td>$$ {client}</td><td> $${location}</td><td>${date}</td></tr>
        </tbody>
      </table>

      <table class="table table-bordered mt-3">
        <thead class="bg-secondary text-white">
          <tr><th>Asset Number</th><th>Serial Number</th><th>Year Built</th></tr>
        </thead>
        <tbody>
          <tr><td>${asset}</td><td>N/A</td><td>2025</td></tr>
        </tbody>
      </table>

      <table class="table table-bordered mt-3">
        <thead class="bg-secondary text-white">
          <tr><th>Material</th><th>Service</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td colspan="3">${material}</td></tr>
        </tbody>
      </table>

      <table class="table table-bordered mt-3">
        <thead class="bg-secondary text-white">
          <tr><th>Inspector's Name</th><th>Certification Number</th><th>Signature</th></tr>
        </thead>
        <tbody>
          <tr><td>Matt Baxter</td><td>https://icpinspector.api.org/profile/matthewallanbaxter671714/wallet</td><td>[Digital Signature]</td></tr>
        </tbody>
      </table>

      <h3 class="mt-4">Scope</h3>
      <p>${scope}</p>

      <h3 class="mt-3">Summary</h3>
      <p>${summary}</p>

      <h3 class="mt-4">Digital Camera Photos</h3>
      <div class="row">
        <div class="col-md-6 border p-2">
          <img src="${image1}" class="img-fluid" alt="Weld Image 1">
          <p class="text-center"><strong>Caption:</strong> Weld Image 1</p>
        </div>
        <div class="col-md-6 border p-2">
          <img src="${image2}" class="img-fluid" alt="Weld Image 2">
          <p class="text-center"><strong>Caption:</strong> Weld Image 2</p>
        </div>
      </div>

      <h3 class="mt-4">Defect Table</h3>
      <table class="table table-bordered">
        <thead class="bg-secondary text-white">
          <tr><th>Weld #</th><th>Pipe Size</th><th>Fitting Type</th><th>Defect</th><th>Results</th><th>Repaired</th><th>Final Result</th></tr>
        </thead>
        <tbody>
          ${defects.map((def, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>Unknown</td>
              <td>Unknown</td>
              <td>${def}</td>
              <td>${def.includes('Reject') ? 'Reject' : 'Accept'}</td>
              <td>Unknown</td>
              <td>Unknown</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h3 class="mt-4">Compliance</h3>
      <p>${compliance}</p>

      <h3 class="mt-3">Recommended Actions</h3>
      <p>${actions}</p>

      <h3 class="mt-3">Overall Weld Quality</h3>
      <p>${overall}/10</p>

      <p class="text-end mt-4"><strong>Inspector:</strong> Matt Baxter<br><strong>Prepared by:</strong> SecondEyesAI™</p>
    </div>
  `;
}
