

function setClaimDate(inputDate) {
    // Parse input date (yyyy-MM-dd HH:mm)
    const dateObj = new Date(inputDate.replace(/-/g, '/'));
    
    // Format to MM/dd/yyyy HH:mm
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const formattedDate = `${month}/${day}/${year} ${hours}:${minutes}`;
    
    // Update input field
    const inputField = document.querySelector('input[name="CLAIM_DATE"]');
    if (inputField) {
        inputField.value = formattedDate;
    } else {
        console.error('Input field not found');
    }
}

function setClaimType(claimTypeText) {
  const select = document.querySelector('select[name="CLAIM_TYPE"]');
  if (!select) {
    console.error('Select element with name "CLAIM_TYPE" not found');
    return;
  }
  const option = Array.from(select.options).find(opt => opt.text === claimTypeText);

  if (option) {
    select.value = option.value;
    // Trigger the onchange event to ensure any attached handlers run
    const event = new Event('change', { bubbles: true });
    select.dispatchEvent(event);

  } else {
    console.error('Select element with name "CLAIM_TYPE" not found');
  }
}



function setVehicleType(travelTypeText) {
  const select = document.querySelector('select[name="TRAVEL_TYPE"]');
  if (!select) {
    console.error('Select element with name "TRAVEL_TYPE" not found');
    return;
  }
  
  const option = Array.from(select.options).find(opt => opt.text === travelTypeText);
  if (option) {
    select.value = option.value;
    // Trigger the onchange event to ensure any attached handlers run
    const event = new Event('change', { bubbles: true });
    select.dispatchEvent(event);
  } else {
    console.error(`Option with text "${travelTypeText}" not found in TRAVEL_TYPE dropdown`);
  }
}


function setLocationFrom(locationCode) {
  const select = document.querySelector('select[name="LOC_FR"]');
  if (!select) {
    console.error('Select element with name "LOC_FR" not found');
    return;
  }

  const option = Array.from(select.options).find(opt => opt.text === locationCode);
  if (option) {
    select.value = option.value;
    // Trigger the onchange event to ensure any attached handlers run
    const event = new Event('change', { bubbles: true });
    select.dispatchEvent(event);
  } else {
    // If location not found, select "OTH"
    const othOption = Array.from(select.options).find(opt => opt.text === 'OTH');
    if (othOption) {
      select.value = othOption.value;
      // Trigger the onchange event
      const event = new Event('change', { bubbles: true });
      select.dispatchEvent(event);
    } else {
      console.error('Option "OTH" not found in LOC_FR dropdown');
    }

    // Update LOC_DESC_FR input with the provided location text
    const input = document.querySelector('input[name="LOC_DESC_FR"]');
    if (input) {
      input.value = locationCode;
    } else {
      console.error('Input field with name "LOC_DESC_FR" not found');
    }
  }
}


function setLocationTo(locationText) {
  const select = document.querySelector('select[name="LOC_TO"]');
  if (!select) {
    console.error('Select element with name "LOC_TO" not found');
    return;
  }

  const option = Array.from(select.options).find(opt => opt.text === locationText);
  if (option) {
    select.value = option.value;
    // Trigger the onchange event to ensure any attached handlers run
    const event = new Event('change', { bubbles: true });
    select.dispatchEvent(event);
  } else {
    // If location not found, select "OTH"
    const othOption = Array.from(select.options).find(opt => opt.text === 'OTH');
    if (othOption) {
      select.value = othOption.value;
      // Trigger the onchange event
      const event = new Event('change', { bubbles: true });
      select.dispatchEvent(event);
    } else {
      console.error('Option "OTH" not found in LOC_TO dropdown');
    }

    // Update LOC_DESC_TO input with the provided location text
    const input = document.querySelector('input[name="LOC_DESC_TO"]');
    if (input) {
      input.value = locationText;
    } else {
      console.error('Input field with name "LOC_DESC_TO" not found');
    }
  }
}

function setLocation(locFrom, locTo) {
  setLocationFrom(locFrom);
  setLocationTo(locTo);
}

function setProjId(projectName) {
  const select = document.querySelector('select[name="PROJ_ID"]');
  if (!select) {
    console.error('Select element with name "PROJ_ID" not found');
    return;
  }

  // Find the option with matching text
  const option = Array.from(select.options).find(opt => opt.text === projectName);
  if (option) {
    select.value = option.value;
    // Trigger the onchange event to ensure any attached handlers run
    const event = new Event('change', { bubbles: true });
    select.dispatchEvent(event);
  } else {
    console.error(`Option with text "${projectName}" not found in PROJ_ID select`);
  }
}

function setJobId(jobType) {
  const select = document.querySelector('select[name="JOB_ID"]');
  if (!select) {
    console.error('Select element with name "JOB_ID" not found');
    return;
  }
  
  const option = Array.from(select.options).find(opt => opt.text === jobType);
  if (option) {
    select.value = option.value;
    // Trigger the onchange event to ensure any attached handlers run
    const event = new Event('change', { bubbles: true });
    select.dispatchEvent(event);
  } else {
    console.error(`Option with text "${jobType}" not found in JOB_ID select`);
  }
}

function setAmt(money) {
  const input = document.querySelector('input[name="AMT"]');
  if (input) {
    input.value = money;
  } else {
    console.error('Input field with name "AMT" not found');
  }
}





window.updateClaimForm = (dateStr, claimType, money, proj = 'VRMS') => {
  // type: am-travel, pm-travel, lunch
  var home = 'Wong Tai Sin';
  var work = 'HKCEC';
  var job = 'T9';

  switch (claimType) {
    case 'am-travel':
      setClaimDate(dateStr + ' 07:15');
      setClaimType('TRAV');
      setVehicleType('MTR');
      setLocation(home, work);
      break;
    case 'pm-travel':
      setClaimDate(dateStr + ' 18:00');
      setClaimType('TRAV');
      setVehicleType('MTR');
      setLocation(work, home);
      break;
    case 'lunch':
      setClaimDate(dateStr + ' 13:00');
      setClaimType('MEAL');
      setVehicleType('Select Vehicle Type');
      setLocation('Select Location', 'Select Location');
      break;
    case 'office-travel':
      setClaimDate(dateStr + ' 15:30');
      setClaimType('TRAV');
      setVehicleType('MTR');
      setLocation('OFC', 'WKGO');

      break;
    default:
      console.error(`Unknown claim type: "${claimType}"`);
      break;
  }
  setProjId(proj);
  setJobId(job);
  setAmt(money);

}

/*
var dateStr = '2025-06-14'
updateClaimForm(dateStr, 'am-travel','15.8')

updateClaimForm(dateStr, 'pm-travel','15.8')

updateClaimForm(dateStr, 'lunch','200')
*/

console.log("Custom script running!");
// Your code here
(function() {
    // Create container for form elements
    const container = document.createElement('div');
    container.style.padding = '10px';
    container.style.backgroundColor = '#f0f0f0';
    container.style.border = '1px solid #ccc';
    container.style.margin = '10px';
    container.style.display = 'inline-block';

    // Date picker
    const dateLabel = document.createElement('label');
    dateLabel.innerText = 'Date: ';
    dateLabel.htmlFor = 'claim-date';
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'claim-date';
    dateInput.style.marginRight = '10px';

    // Travel fee input
    const travelLabel = document.createElement('label');
    travelLabel.innerText = 'Travel Fee: $';
    travelLabel.htmlFor = 'travel-fee';
    const travelInput = document.createElement('input');
    travelInput.type = 'number';
    travelInput.id = 'travel-fee';
    travelInput.value = '15.8';
    travelInput.step = '0.10';
    travelInput.min = '0';
    travelInput.style.marginRight = '10px';

    // Lunch fee input
    const lunchLabel = document.createElement('label');
    lunchLabel.innerText = 'Lunch Fee: $';
    lunchLabel.htmlFor = 'lunch-fee';
    const lunchInput = document.createElement('input');
    lunchInput.type = 'number';
    lunchInput.id = 'lunch-fee';
    lunchInput.value = '200';
    lunchInput.step = '0.10';
    lunchInput.min = '0';
    lunchInput.style.marginRight = '10px';

    // Project radio buttons
    const projectLabel = document.createElement('label');
    projectLabel.innerText = 'Project: ';
    projectLabel.style.marginRight = '10px';
    projectLabel.style.display = 'inline-block';

    const projectContainer = document.createElement('div');
    projectContainer.style.display = 'inline-block';

    // Configurable projects array
    const projects = [
        { id: 'vrms', name: 'VRMS', checked: true },
        { id: 'rtpcs', name: 'RTPCS', checked: false }
    ];

    // Dynamically create radio buttons based on projects array
    projects.forEach(project => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = `project-${project.id}`;
        radio.name = 'project';
        radio.value = project.name;
        if (project.checked) {
            radio.checked = true;
        }

        const label = document.createElement('label');
        label.htmlFor = `project-${project.id}`;
        label.innerText = project.name;
        label.style.marginRight = '10px';

        projectContainer.appendChild(radio);
        projectContainer.appendChild(label);
    });

    // Buttons
    const amTravelButton = document.createElement('button');
    amTravelButton.innerText = 'Claim AM Travel';
    amTravelButton.style.marginRight = '5px';

    const pmTravelButton = document.createElement('button');
    pmTravelButton.innerText = 'Claim PM Travel';
    pmTravelButton.style.marginRight = '5px';

    const OfficeTravelButton = document.createElement('button');
    OfficeTravelButton.innerText = 'Claim Office Travel';
    OfficeTravelButton.style.marginRight = '5px';

    const lunchButton = document.createElement('button');
    lunchButton.innerText = 'Claim Lunch';

    // Append elements to container
    container.appendChild(dateLabel);
    container.appendChild(dateInput);
    container.appendChild(document.createElement('br'));
    container.appendChild(projectLabel);
    container.appendChild(projectContainer);
    container.appendChild(document.createElement('br'));
    container.appendChild(travelLabel);
    container.appendChild(travelInput);
   
    container.appendChild(amTravelButton);
    container.appendChild(pmTravelButton);
    container.appendChild(OfficeTravelButton);
    container.appendChild(document.createElement('br'));
    container.appendChild(lunchLabel);
    container.appendChild(lunchInput);
    container.appendChild(lunchButton);

    // Add container to page when the path is /hkots/create_claim_record.jsp*
    
if (window.location.pathname === '/hkots/create_claim_record.jsp') {
   document.body.appendChild(container);
} 

    // Button event listeners
    amTravelButton.addEventListener('click', () => {
        const date = dateInput.value;
        const travelFee = travelInput.value;
        const project = document.querySelector('input[name="project"]:checked').value;
        if (date && travelFee) {
            window.updateClaimForm(date, 'am-travel', travelFee, project);
        } else {
            alert('Please enter a date and travel fee.');
        }
    });

    pmTravelButton.addEventListener('click', () => {
        const date = dateInput.value;
        const travelFee = travelInput.value;
        const project = document.querySelector('input[name="project"]:checked').value;
        if (date && travelFee) {
            window.updateClaimForm(date, 'pm-travel', travelFee, project);
        } else {
            alert('Please enter a date and travel fee.');
        }
    });

    OfficeTravelButton.addEventListener('click', () => {
        const date = dateInput.value;
        const travelFee = travelInput.value;
        const project = document.querySelector('input[name="project"]:checked').value;
        if (date && travelFee) {
            window.updateClaimForm(date, 'office-travel', travelFee, project);
        } else {
            alert('Please enter a date and travel fee.');
        }
    });    

    lunchButton.addEventListener('click', () => {
        const date = dateInput.value;
        const lunchFee = lunchInput.value;
        const project = document.querySelector('input[name="project"]:checked').value;
        if (date && lunchFee) {
            window.updateClaimForm(date, 'lunch', lunchFee, project);
        } else {
            alert('Please enter a date and lunch fee.');
        }
    });
})();



if (window.location.pathname.startsWith('/hkots/print_claim_record.jsp')) {
  // Add new date fields inline with existing ones
  document.querySelector('input[name="DATE_FROM"]').insertAdjacentHTML('afterend', 
    '<input type="date" class="txtFieldLarge newDateField" style="display:inline;margin-left:10px;" data-target="DATE_FROM">'
  );
  document.querySelector('input[name="DATE_TO"]').insertAdjacentHTML('afterend', 
    '<input type="date" class="txtFieldLarge newDateField" style="display:inline;margin-left:10px;" data-target="DATE_TO">'
  );

  // Add event listeners to new date fields
  document.querySelectorAll('.newDateField').forEach(field => {
    field.addEventListener('change', (e) => {
      const targetFieldName = e.target.dataset.target;
      const targetField = document.querySelector(`input[name="${targetFieldName}"]`);
      
      if (e.target.value) {
        // Convert date to MM/dd/yyyy format
        const date = new Date(e.target.value);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/` +
                           `${date.getDate().toString().padStart(2, '0')}/` +
                           `${date.getFullYear()}`;
        targetField.value = formattedDate;
      } else {
        targetField.value = '';
      }
    });
  });
}