function generateReport() {
  // Collect form values (same as before)
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

  // Build report HTML with enhanced styling
  const reportDiv = document.getElementById('report-output');
  reportDiv.innerHTML = `
    <div class="container mt-5 p-4 border rounded bg-white text-dark shadow-lg">
      <h1 class="text-center report-header">B T D Baxter Technical Dynamics</h1>
      <h2 class="text-center report-title">ASSET EXTERNAL & INTERNAL INSPECTION REPORT</h2>
      <p class="text-center small">FORM INS.01.00 | REV. 0 | Page 1 of 1</p>
      <hr class="border-primary">

      <table class="table table-bordered">
        <thead>
          <tr class="table-header"><th>Client</th><th>Location/Facility</th><th>Date of Inspection</th></tr>
        </thead>
        <tbody>
          <tr><td>$$ {client}</td><td> $${location}</td><td>${date}</td></tr>
        </tbody>
      </table>

      <table class="table table-bordered mt-3">
        <thead>
          <tr class="table-header"><th>Asset Number</th><th>Serial Number</th><th>Year Built</th></tr>
        </thead>
        <tbody>
          <tr><td>${asset}</td><td>N/A</td><td>2025</td></tr>
        </tbody>
      </table>

      <table class="table table-bordered mt-3">
        <thead>
          <tr class="table-header"><th>Material</th><th>Service</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td colspan="3">${material}</td></tr>
        </tbody>
      </table>

      <table class="table table-bordered mt-3">
        <thead>
          <tr class="table-header"><th>Inspector's Name</th><th>Certification Number</th><th>Signature</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Matt Baxter</td>
            <td><a href="https://icpinspector.api.org/profile/matthewallanbaxter671714/wallet" class="text-primary">View Certification</a></td>
            <td class="signature">[Digital Signature]</td>
          </tr>
        </tbody>
      </table>

      <h3 class="mt-4 text-primary">Scope</h3>
      <p class="border p-2 bg-light">${scope}</p>

      <h3 class="mt-3 text-primary">Summary</h3>
      <p class="border p-2 bg-light">${summary}</p>

      <h3 class="mt-4 text-primary">Digital Camera Photos</h3>
      <div class="row">
        <div class="col-md-6 border p-2">
          <img src="${image1}" class="img-fluid" alt="Weld Image 1">
          <p class="text-center small"><strong>Caption:</strong> Weld Image 1</p>
        </div>
        <div class="col-md-6 border p-2">
          <img src="${image2}" class="img-fluid" alt="Weld Image 2">
          <p class="text-center small"><strong>Caption:</strong> Weld Image 2</p>
        </div>
      </div>

      <h3 class="mt-4 text-primary">Defect Table</h3>
      <table class="table table-bordered">
        <thead>
          <tr class="table-header"><th>Weld #</th><th>Pipe Size</th><th>Fitting Type</th><th>Defect</th><th>Results</th><th>Repaired</th><th>Final Result</th></tr>
        </thead>
        <tbody>
          ${defects.map((def, index) => {
            const isReject = def.includes('Reject');
            const resultClass = isReject ? 'reject' : 'accept';
            return `
              <tr>
                <td>${index + 1}</td>
                <td>Unknown</td>
                <td>Unknown</td>
                <td>${def}</td>
                <td class="$$ {resultClass}"> $${isReject ? 'Reject' : 'Accept'}</td>
                <td>Unknown</td>
                <td class="$$ {resultClass}"> $${isReject ? 'Reject' : 'Accept'}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>

      <h3 class="mt-4 text-primary">Compliance</h3>
      <p class="border p-2 bg-light">${compliance}</p>

      <h3 class="mt-3 text-primary">Recommended Actions</h3>
      <p class="border p-2 bg-light">${actions}</p>

      <h3 class="mt-3 text-primary">Overall Weld Quality</h3>
      <p class="quality-badge text-center">${overall}/10</p>

      <p class="text-end mt-4 signature">
        <strong>Inspector:</strong> Matt Baxter<br>
        <strong>Prepared by:</strong> SecondEyesAI™
      </p>

      <div class="appendix mt-5 border-top pt-3">
        <h4>AWS D18.1/D18.1M:2020 – Visual Examination Requirements</h4>
        <p>6. Visual Examination Requirements<br>6.1 General. All welds shall be visually examined. A weld shall be acceptable by visual inspection if it conforms to the applicable requirements of 6.2 and 6.3. The shape of the weld shall be suitable for the specified NDT, where applicable. [Full text from template PDF goes here – e.g., details on undercut, craters, underfill, etc.]</p>
      </div>
    </div>
  `;
}
