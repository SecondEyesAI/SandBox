function generateReport() {
  // Collect form values (with fallbacks to PDF data if empty)
  const client = document.getElementById('client').value || 'Stellar';
  const location = document.getElementById('location').value || 'Brazos River Venture';
  const date = document.getElementById('date').value || '10/11/2025';
  const asset = document.getElementById('asset').value || 'TNK50001/TNK50004 Pump Skid';
  const serial = document.getElementById('serial').value || 'N/A';
  const year = document.getElementById('year').value || '2025';
  const material = document.getElementById('material').value || '316L SS';
  const service = document.getElementById('service').value || 'Process';
  const description = document.getElementById('description').value || 'Pump Skid';
  const inspector = document.getElementById('inspector').value || 'Matt Baxter';
  const cert = document.getElementById('cert').value || 'Matt Baxter Certifications Link';
  const signature = document.getElementById('signature').value || '';
  const scope = document.getElementById('scope').value || 'Perform internal visual inspection via borescope on Blend Tank 50001 & 50004 Pump Skid.';
  const summary = document.getElementById('summary').value || 'Internal visual inspection of 100% of accessible welds on Blend Tank 50001 & 50004 Pump Skid was conducted per AWS D18.1 acceptance criteria. A RalCam Model F606B borescope was used to inspect 113 welds. Of those 113 welds, 93 were accepted, and 20 were rejected.';
  const defectsRaw = document.getElementById('defects').value.split('\n').filter(line => line.trim());
  const image1 = document.getElementById('image1').value || 'https://www.lewa.com/fileadmin/_processed_/8/7/csm_cp_adv_flowrate-pressure-skid_2c6559014d.jpg'; // Stock pump skid
  const image2 = document.getElementById('image2').value || 'https://www.projecteka.com/wp-content/uploads/2022/03/Isometric-pipe-drawing-1-scaled.jpg'; // Stock isometric
  const compliance = document.getElementById('compliance').value || 'API 510 / ASME IX (Accept/Reject per defect)';
  const actions = document.getElementById('actions').value || 'Grind, Rework';
  const overall = document.getElementById('overall').value || '8';

  // Parse defects or use full PDF data if empty
  let weldData = [];
  if (defectsRaw.length > 0) {
    defectsRaw.forEach(line => {
      const parts = line.split(':');
      if (parts.length === 2) {
        const weld = parts[0].trim();
        const details = parts[1].split('|').map(d => d.trim());
        const pipeSize = details[0] || 'Unknown';
        const fitting = details[1] || 'Unknown';
        const defect = details[2] || '';
        const repaired = details[3] || '----';
        const final = details[4] || (defect ? 'Pending' : '');
        const result = defect ? 'Reject' : 'Accept';
        weldData.push([weld, pipeSize, fitting, defect, result, repaired, final || result]);
      }
    });
  } else {
    // Full weld data from PDF
    weldData = [
      ['1', '3"', 'Reducer', '', 'Accept', '----', 'Accept'],
      ['2', '4"', 'Reducer', '', 'Accept', '----', 'Accept'],
      ['3', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['4', '4"', '90° Elbow', 'IP', 'Reject', 'Pending', 'Reject'],
      ['5', '4"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['6', '4"', 'Reducer', 'LOF', 'Reject', 'Pending', 'Reject'],
      ['7', '6"', 'Fitting to Fitting', '', 'Accept', '----', 'Accept'],
      ['8', '6"', '90° Elbow', 'IP', 'Reject', 'Pending', 'Reject'],
      ['9', '6"', '90° Elbow', 'IP', 'Reject', 'Pending', 'Reject'],
      ['9A', '6"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['10', '4"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['11', '4"', 'Reducer', 'Multiple', 'Reject', 'Pending', 'Reject'],
      ['12', '6"', 'Fitting to Fitting', 'IP', 'Reject', 'Pending', 'Reject'],
      ['13', '6"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['14', '6"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['14A', '6"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['15', '4"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['16', '4"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['17', '4"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['18', '4"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['19', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['20', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['21', '3"', 'Pipe', 'Multiple', 'Reject', 'Pending', 'Reject'],
      ['22', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['23', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['24', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['25', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['26', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['27', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['28', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['29', '3"', '90° Elbow', 'IP', 'Reject', 'Pending', 'Reject'],
      ['30', '4"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['31', '4"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['31A', '4"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['33', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['34', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['35', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['36', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['38', '3"', '90° Elbow', 'IP', 'Reject', 'Pending', 'Reject'],
      ['39', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['40', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['41', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['42', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['43', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['44', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['45', '3"', 'Reducer', '', 'Accept', '----', 'Accept'],
      ['46', '3"', 'Reducer', '', 'Accept', '----', 'Accept'],
      ['47', '4"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['48', '4"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['49', '4"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['50', '4"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['51', '4"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['52', '4"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['53', '4"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['54', '4"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['55', '4"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['56', '4"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['57', '4"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['58', '4"', 'Pipe', 'LOF', 'Reject', 'Pending', 'Reject'],
      ['59', '3"', 'Reducer', 'IP', 'Reject', 'Pending', 'Reject'],
      ['60', '4"', 'Reducer', 'IP', 'Reject', 'Pending', 'Reject'],
      ['61', '4"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['62', '4"', '90° Elbow', 'Multiple', 'Reject', 'Pending', 'Reject'],
      ['63', '4"', 'Pipe', 'EPM', 'Reject', 'Pending', 'Reject'],
      ['64', '4"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['65', '3"', 'Fitting to Fitting', '', 'Accept', '----', 'Accept'],
      ['66', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['67', '4"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['68', '4"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['69', '4"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['70', '4"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['71', '4"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['72', '4"', 'Reducer', 'Multiple', 'Reject', 'Pending', 'Reject'],
      ['73', '6"', 'Fitting to Fitting', 'IP', 'Reject', 'Pending', 'Reject'],
      ['74', '6"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['75', '6"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['75A', '6"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['76', '6"', 'Fitting to Fitting', 'Multiple', 'Reject', 'Pending', 'Reject'],
      ['77', '4"', 'Reducer', '', 'Accept', '----', 'Accept'],
      ['78', '6"', '90° Elbow', 'IP', 'Reject', 'Pending', 'Reject'],
      ['79', '6"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['79A', '6"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['80 Hemi', '4"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['81 Hemi', '4"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['82 Hemi', '4"', '90° Elbow', 'IP', 'Reject', 'Repaired', 'Accept'],
      ['83 Hemi', '4"', 'Fitting to Fitting', '', 'Accept', '----', 'Accept'],
      ['84', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['85', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['86', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['87', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['88', '3"', 'Reducer', 'LOF', 'Reject', 'Pending', 'Reject'],
      ['89', '2"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['90', '2"', 'Reducer', '', 'Accept', '----', 'Accept'],
      ['91', '3"', 'Reducer', '', 'Accept', '----', 'Accept'],
      ['92', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['93', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['94', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['95', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['96', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['97', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['98', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['99', '2"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['100', '2"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['101', '2"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['102', '2"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['103', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['104', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['105', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['106', '3"', '90° Elbow', '', 'Accept', '----', 'Accept'],
      ['107', '3"', 'Pipe', '', 'Accept', '----', 'Accept'],
      ['108', '3"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['109', '3"', 'Ferrule', '', 'Accept', '----', 'Accept'],
      ['110', '3"', '90° Elbow', '', 'Accept', '----', 'Accept']
      // Note: PDF says 113 welds, but lists up to 110; add placeholders if needed for 111-113
    ];
  }

  // Rejected welds from PDF
  const rejectedWelds = ['4', '6', '8', '9', '11', '12', '21', '29', '38', '58', '59', '60', '62', '63', '72', '73', '76', '78', '82 Hemi', '88'];

  // Stock photos for rejected welds (cycle through)
  const weldCloseUps = [
    'https://stainlesssolutionscip.com/wp-content/uploads/2023/03/SS-Borescope-Weld-Inspection.webp',
    'https://www.ipec.ie/wp-content/uploads/2022/02/Orbital-Weld-800-x-500.jpg',
    'https://www.shutterstock.com/image-photo/closeup-pipe-tky-joint-welding-600nw-2690128119.jpg',
    'https://www.ndt.net/article/ecndt98/chemical/129/fig1.jpg',
    'https://i.ytimg.com/vi/38Mu414UGS8/maxresdefault.jpg'
  ];
  const weldLocations = [
    'https://static.redasafe.com/media/mageplaza/blog/post/p/i/pipe_markers_guide.jpg',
    'https://cdn.thefabricator.com/a/welder-training-essentials-positioning-it-right-1695415341.JPG',
    'https://www.industrialtradeservices.com/wp-content/uploads/2022/03/Weld-Symbols.webp',
    'https://www.epowermetals.com/wp-content/uploads/2022/10/welding-process-of-steel-pipe-and-flange.jpg',
    'https://www.mtm-inc.com/uploads/6/7/6/1/67611195/9894704_orig.jpg'
  ];

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

    <table class="table table-bordered">
      <thead class="table-header">
        <tr><th>Client</th><th>Location/Facility</th><th>Date of Inspection</th></tr>
      </thead>
      <tbody>
        <tr><td>${client}</td><td>${location}</td><td>${date}</td></tr>
      </tbody>
    </table>

    <table class="table table-bordered mt-3">
      <thead class="table-header">
        <tr><th>Asset Number</th><th>Serial Number</th><th>Year Built</th></tr>
      </thead>
      <tbody>
        <tr><td>${asset}</td><td>${serial}</td><td>${year}</td></tr>
      </tbody>
    </table>

    <table class="table table-bordered mt-3">
      <thead class="table-header">
        <tr><th>Material</th><th>Service</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>${material}</td><td>${service}</td><td>${description}</td></tr>
      </tbody>
    </table>

    <table class="table table-bordered mt-3">
      <thead class="table-header">
        <tr><th>Inspector's Name</th><th>Inspector's Certification Number</th><th>Signature</th></tr>
      </thead>
      <tbody>
        <tr><td>${inspector}</td><td><a href="${cert}" class="text-primary">View Certification</a></td><td class="signature">${signature}</td></tr>
      </tbody>
    </table>

    <h3 class="mt-4">Scope:</h3>
    <p>${scope}</p>

    <h3 class="mt-3">Summary:</h3>
    <p>${summary}</p>

    <div class="image-border p-2 mt-3">
      <img src="${image1}" class="img-fluid" alt="Pump Skid">
      <p class="text-center small">Pump Skid</p>
    </div>

    <div class="appendix mt-5">
      <div class="text-end form-rev">Page 2 of 17</div>
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
    </div>

    <div class="appendix mt-5">
      <div class="text-end form-rev">Page 3 of 17</div>
      <h5>Table 3 Visual Examination Acceptance Criteria for the Inside Surfaces of Welds</h5>
      <table class="table table-bordered">
        <thead class="table-header">
          <tr>
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
          <tr><td>Convexity</td><td>0.012 in (0.3 mm) maximum [Fig. 2C]</td><td>0.012 in (0.3 mm) maximum [Fig. 2C]</td></tr>
          <tr><td>Discoloration</td><td>Weld surface shall not contain excessive discoloration. Acceptable discoloration levels shall be referenced per Fig. 3 and agreed upon by the Owner and Contractor.</td><td>Weld surface shall not contain excessive discoloration. Oxidation indicated by discoloration shown in Examples 4 through 10 unless otherwise agreed upon by the Owner and Contractor.</td></tr>
          <tr><td>Oxide Islands</td><td></td><td>Larger than 1/16 in (1.6 mm) in diameter [Fig. 4A] shall be unacceptable. No more than 4 oxide islands shall be present in any 4 linear inch (100 mm) of weld or no more than one oxide island per 1.5 cm² (0.23 in²) [25 mm] of weld surface. Oxide islands less than 1/64 in (0.4 mm) in size shall be disregarded.</td></tr>
          <tr><td>Minimum Face Width of Manual Welds</td><td></td><td></td></tr>
          <tr><td>Uniformity of Face Width of Manual Welds</td><td></td><td></td></tr>
          <tr><td>Consistency of Start, Termination, and Width</td><td></td><td></td></tr>
          <tr><td colspan="3">Note: A shaded area indicates nonapplicability. +T is the nominal wall thickness of the thinner of the two members being joined. Weld metal shall blend smoothly into base metal.</td></tr>
        </tbody>
      </table>
    </div>

    <div class="appendix mt-5">
      <div class="text-end form-rev">Page 4 of 17</div>
      <div class="image-border p-2">
        <img src="${image2}" class="img-fluid" alt="Isometric Drawing 1">
        <p class="text-center small">Isometric Drawing 1</p>
      </div>
    </div>

    <div class="appendix mt-5">
      <div class="text-end form-rev">Page 5 of 17</div>
      <div class="image-border p-2">
        <img src="https://thumbs.dreamstime.com/b/pump-station-d-illustration-wire-frame-style-orthography-isometric-pump-station-d-illustration-269934330.jpg" class="img-fluid" alt="Isometric Drawing 2">
        <p class="text-center small">Isometric Drawing 2</p>
      </div>
    </div>

    <div class="appendix mt-5">
      <div class="text-end form-rev">Page 6 of 17</div>
      <h3>Blend Tank 50001 & 50004 Pump Skid Weld Inspections</h3>
      <table class="table table-bordered">
        <thead class="table-header">
          <tr><th>Weld #</th><th>Pipe Size</th><th>Fitting Type</th><th>Defect</th><th>Results</th><th>Repaired</th><th>Final Result</th></tr>
        </thead>
        <tbody>
          ${weldData.map(row => `
            <tr>
              <td>${row[0]}</td>
              <td>${row[1]}</td>
              <td>${row[2]}</td>
              <td>${row[3]}</td>
              <td class="${row[4] === 'Accept' ? 'accept' : 'reject'}">${row[4]}</td>
              <td>${row[5]}</td>
              <td class="${row[6] === 'Accept' ? 'accept' : 'reject'}">${row[6]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="appendix mt-5">
      <div class="text-end form-rev">Page 8 of 17</div>
      <h3>Rejected Weld Images</h3>
      <div class="row">
        ${rejectedWelds.map((w, index) => `
          <div class="col-md-6 mb-3 image-border p-2">
            <img src="${weldCloseUps[index % weldCloseUps.length]}" class="img-fluid" alt="Weld Number ${w}">
            <p class="text-center small">Weld Number ${w}</p>
          </div>
          <div class="col-md-6 mb-3 image-border p-2">
            <img src="${weldLocations[index % weldLocations.length]}" class="img-fluid" alt="Weld Number ${w} Location">
            <p class="text-center small">Weld Number ${w} Location</p>
          </div>
        `).join('')}
      </div>
    </div>

    <h3 class="mt-4">Compliance</h3>
    <p>${compliance}</p>

    <h3 class="mt-3">Recommended Actions</h3>
    <p>${actions}</p>

    <h3 class="mt-3">Overall Weld Quality</h3>
    <p class="quality-badge text-center">${overall}/10</p>

    <p class="text-end mt-4 signature">
      Inspector: ${inspector}<br>
      Prepared by: SecondEyesAI™
    </p>
  `;
}
