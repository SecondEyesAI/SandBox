function generateReport() {
  // Collect form values
  const client = document.getElementById('client').value;
  const location = document.getElementById('location').value;
  const date = document.getElementById('date').value || '11/08/2025';
  const asset = document.getElementById('asset').value;
  const serial = document.getElementById('serial').value;
  const year = document.getElementById('year').value;
  const material = document.getElementById('material').value;
  const service = document.getElementById('service').value;
  const description = document.getElementById('description').value;
  const inspector = document.getElementById('inspector').value;
  const cert = document.getElementById('cert').value;
  const signature = document.getElementById('signature').value;
  const scope = document.getElementById('scope').value;
  const summary = document.getElementById('summary').value;
  const defects = document.getElementById('defects').value.split('\n').filter(line => line.trim());
  const compliance = document.getElementById('compliance').value;
  const actions = document.getElementById('actions').value;
  const overall = document.getElementById('overall').value;

  // Parse defects to build table (weld#: defect, with hardcoded pipe/fitting from PDF pattern for simplicity; expand as needed)
  const weldData = [
    ['1', '3"', 'Reducer', '', 'Accept', '----', ''],
    ['2', '4"', 'Reducer', '', 'Accept', '----', ''],
    // ... (to save space, add all 110+ from the PDF parse; here's a sample - replace with full list)
    ['4', '4"', '90° Elbow', 'IP', 'Reject', 'Pending', ''],
    ['6', '4"', 'Reducer', 'LOF', 'Reject', 'Pending', ''],
    ['8', '6"', '90° Elbow', 'IP', 'Reject', 'Pending', ''],
    ['9', '6"', '90° Elbow', 'IP', 'Reject', 'Pending', ''],
    ['9A', '6"', '90° Elbow', '', 'Accept', '----', ''],
    // Continue with all entries from pages 6-8... 
    // For defects from form, override if provided
  ];

  // Override defects from form (parse "Weld X: Defect")
  defects.forEach(line => {
    const [weld, defect] = line.split(':').map(s => s.trim());
    const index = weldData.findIndex(row => row[0] === weld);
    if (index !== -1) {
      weldData[index][3] = defect;
      weldData[index][4] = defect ? 'Reject' : 'Accept';
      weldData[index][6] = defect ? '' : '';
    }
  });

  // Rejected welds for image sections (from PDF)
  const rejectedWelds = ['4', '6', '8', '9', '11', '21', '29', '38', '58', '59', '60', '62', '63', '72', '73', '76', '78', '88'];

  // Build report HTML
  const reportDiv = document.getElementById('report-output');
  reportDiv.innerHTML = `
    <div class="row justify-content-between">
      <div class="col-auto">
        <h1 class="logo">B T D</h1>
        <p class="company">Baxter Technical Dynamics</p>
        <p class="services">Inspection Services</p>
      </div>
      <div class="col-auto text-end form-rev">
        FORM INS.01.00<br>REV. 0<br>Page 1 of 17
      </div>
    </div>
    <h2 class="text-center report-title">WELD INSPECTION REPORT</h2>
    <hr>

    <table class="table table-bordered mt-3">
      <thead>
        <tr class="table-header"><th>Client</th><th>Location/Facility</th><th>Date of Inspection</th></tr>
      </thead>
      <tbody>
        <tr><td>${client}</td><td>${location}</td><td>${date}</td></tr>
      </tbody>
    </table>

    <table class="table table-bordered mt-3">
      <thead>
        <tr class="table-header"><th>Asset Number</th><th>Serial Number</th><th>Year Built</th></tr>
      </thead>
      <tbody>
        <tr><td>${asset}</td><td>${serial}</td><td>${year}</td></tr>
      </tbody>
    </table>

    <table class="table table-bordered mt-3">
      <thead>
        <tr class="table-header"><th>Material</th><th>Service</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>${material}</td><td>${service}</td><td>${description}</td></tr>
      </tbody>
    </table>

    <table class="table table-bordered mt-3">
      <thead>
        <tr class="table-header"><th>Inspector's Name</th><th>Inspector's Certification Number</th><th>Signature</th></tr>
      </thead>
      <tbody>
        <tr><td>${inspector}</td><td><a href="${cert}" class="text-primary">View Certification</a></td><td class="signature">${signature}</td></tr>
      </tbody>
    </table>

    <h3 class="mt-4">Scope:</h3>
    <p>${scope}</p>

    <h3 class="mt-3">Summary:</h3>
    <p>${summary}</p>

    <h3 class="mt-4">Pump Skid Overview</h3>
    <div class="row">
      <div class="col-md-6 image-border">
        <img src="https://via.placeholder.com/500x300?text=Pump+Skid+Overview" class="img-fluid" alt="Pump Skid">
        <p class="text-center small">Pump Skid</p>
      </div>
      <div class="col-md-6 image-border">
        <img src="https://via.placeholder.com/500x300?text=Isometric+Drawing+1" class="img-fluid" alt="Isometric Drawing">
        <p class="text-center small">Isometric Drawing 1</p>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6 image-border">
        <img src="https://via.placeholder.com/500x300?text=Isometric+Drawing+2" class="img-fluid" alt="Isometric Drawing">
        <p class="text-center small">Isometric Drawing 2</p>
      </div>
    </div>

    <h3 class="mt-4">Blend Tank 50001 & 50004 Pump Skid Weld Inspections</h3>
    <table class="table table-bordered">
      <thead>
        <tr class="table-header"><th>Weld #</th><th>Pipe Size</th><th>Fitting Type</th><th>Defect</th><th>Results</th><th>Repaired</th><th>Final Result</th></tr>
      </thead>
      <tbody>
        ${weldData.map(row => {
          const resultClass = row[4] === 'Accept' ? 'accept' : 'reject';
          const finalClass = row[6] === 'Accept' ? 'accept' : 'reject';
          return `
            <tr>
              <td>${row[0]}</td>
              <td>${row[1]}</td>
              <td>${row[2]}</td>
              <td>${row[3]}</td>
              <td class="${resultClass}">${row[4]}</td>
              <td>${row[5]}</td>
              <td class="${finalClass}">${row[6]}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>

    <h3 class="mt-4">Rejected Weld Images</h3>
    ${rejectedWelds.map((w, index) => {
      if (index % 2 === 0) {
        return `
          <div class="row mt-3">
            <div class="col-md-6 image-border">
              <img src="https://via.placeholder.com/500x300?text=Weld+Number+${w}" class="img-fluid" alt="Weld ${w}">
              <p class="text-center small">Weld Number ${w}</p>
            </div>
            <div class="col-md-6 image-border">
              <img src="https://via.placeholder.com/500x300?text=Weld+Number+${w}+Location" class="img-fluid" alt="Weld ${w} Location">
              <p class="text-center small">Weld Number ${w} Location</p>
            </div>
          </div>
        `;
      } else {
        return '';
      }
    }).join('')}

    <h3 class="mt-4">Compliance</h3>
    <p>${compliance}</p>

    <h3 class="mt-3">Recommended Actions</h3>
    <p>${actions}</p>

    <h3 class="mt-3">Overall Weld Quality</h3>
    <p class="quality-badge text-center">${overall}/10</p>

    <p class="signature mt-4">
      Inspector: ${inspector}<br>
      Prepared by: SecondEyesAI™
    </p>

    <div class="appendix">
      <h4>AWS D18.1/D18.1M:2020</h4>
      <h5>6. Visual Examination Requirements</h5>
      <p>6.1 Responsibilities for and Extent of Examination</p>
      <p>6.1.1 Welders and welding operators shall visually examine each weld they make in accordance with 6.3. The start, termination, and width of the weld shall be consistent with that of their PWS.</p>
      <p>6.1.2 The Contractor's supervisor, quality control, or quality assurance personnel shall visually examine a representative portion of each welder's and welding operator's production welds in accordance with 6.3 using the welder's or welding operator's PWS and the requirements of this section to verify that the work is satisfactory.</p>
      <p>6.1.3 The Owner's Representative should monitor both the production welding and the Contractor's examination practices.</p>
      <p>6.2 Examination Techniques</p>
      <p>6.2.1 Examination shall be conducted with appropriate lighting, with or without a magnification (no more than 10x magnification).</p>
      <p>6.2.2 When the inside surface of the weld is required to be examined, the examination shall be conducted as follows:</p>
      <p>(1) For easily accessible welds (such as on orifices, ferrules, etc.), use simple tools such as rulers or flashlights.</p>
      <p>(2) For remotely accessible welds, use a borescope, other optical devices or a documented procedure as agreed upon by the Owner and the Contractor.</p>
      <p>6.3 Examination Requirements and Acceptance Criteria. These criteria are for one surface being product contact and one being nonproduct contact. See Figure 1. Examination Requirements Process Piping Autogenous and Filler Metal.</p>
      <p>6.3.1 For welds where the inside surface is easily accessible, both the outside and the inside surfaces shall be examined.</p>
      <p>6.3.1.1 If the inside surface is the product contact surface, the outside surface shall be examined to the criteria of Table 3b.</p>
      <p>(1) If the weld does not meet the criteria of Table 3b, it is rejectable.</p>
      <p>6.3.2 If the outside surface is the product contact surface, it shall be examined to the criteria of Table 3c.</p>
      <p>(1) If the weld does not meet the criteria of Table 3c, it is rejectable.</p>
      <p>6.3.3 If the inside surface is the product contact surface, the inside surface shall be examined to the criteria of Table 3a.</p>
      <p>(1) If the weld does not meet the criteria of Table 3a, it is rejectable.</p>
      <p>6.3.3.1 If the inside surface is the product contact surface, the outside surface shall be examined to the criteria of Table 3b.</p>
      <p>(1) If the weld does not meet the criteria of Table 3b, it is rejectable.</p>
      <p>6.3.2.1 If the outside surface is the product contact surface, the inside surface shall be examined to the criteria of Table 3c.</p>
      <p>(1) If the weld does not meet the criteria of Table 3c, it is rejectable.</p>
      <p>6.3.3 If the inside surface is the product contact surface, the inside surface shall be examined to the criteria of Table 3a.</p>
      <p>(1) If the weld does not meet the criteria of Table 3a, it is rejectable.</p>
      <h5>Table 3 Visual Examination Acceptance Criteria for the Inside Surfaces of Welds</h5>
      <table class="table table-bordered">
        <thead>
          <tr class="table-header">
            <th>Discontinuity</th>
            <th>Table 3a Nonproduct Contact Surface [see 6.3.1.1 and 6.3.2.1]</th>
            <th>Table 3b Product Contact Surfaces [see 6.3.3]</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Incomplete Penetration</td><td>None</td><td>None</td></tr>
          <tr><td>Cracks</td><td>None</td><td>None</td></tr>
          <tr><td>Incomplete Fusion</td><td>None between adjacent weld beads or between weld metal and base metal</td><td>None between adjacent weld beads or between weld metal and base metal</td></tr>
          <tr><td>Undercut</td><td>None</td><td>None</td></tr>
          <tr><td>Cre vices, Porosity, Pits Open to the Surface</td><td>None</td><td>None</td></tr>
          <tr><td>Embedded or Protruding Material</td><td>None</td><td>None</td></tr>
          <tr><td>Offset or Misalignment of the Weld Joint</td><td>15% of nominal wall thickness (T) maximum [Fig. 2A]</td><td>15% of nominal wall thickness (T) maximum [Fig. 2A]</td></tr>
          <tr><td>Concavity</td><td>0.012 in (0.3 mm) maximum [Fig. 2G]</td><td>0.012 in (0.3 mm) maximum [Fig. 2G]</td></tr>
          <tr><td>Convexity</td><td>0.012 in (0.3 mm) maximum [Fig. 2C]</td><td>0.013 in (0.3 mm) maximum [Fig. 2C]</td></tr>
          <tr><td>Discoloration</td><td>Weld surface shall not contain excessive discoloration. Acceptable discoloration levels shall be referenced per Fig. 3 and agreed upon by the Owner and Contractor.</td><td>Weld surface shall not contain excessive discoloration. Oxidation indicated by discoloration shown in Examples 4 through 10 unless otherwise agreed upon by the Owner and Contractor.</td></tr>
          <tr><td>Oxide Islands</td><td></td><td>Larger than 1/16 in (1.6 mm) in diameter [Fig. 4A] shall be unacceptable. No more than 4 oxide islands shall be present in any 4 linear inch (100 mm) of weld or no more than one oxide island per 1.5 cm² (0.23 in²) [25 mm] of weld surface. Oxide islands less than 1/64 in (0.4 mm) in size shall be disregarded.</td></tr>
          <tr><td>Minimum Face Width of Manual Welds</td><td></td><td></td></tr>
          <tr><td>Uniformity of Face Width of Manual Welds</td><td></td><td></td></tr>
          <tr><td>Consistency of Start, Termination, and Width</td><td></td><td></td></tr>
          <tr><td colspan="3">Note: A shaded area indicates nonapplicability. +T is the nominal wall thickness of the thinner of the two members being joined. Weld metal shall blend smoothly into base metal.</td></tr>
        </tbody>
      </table>
    </div>
  `;
}
