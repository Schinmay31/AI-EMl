// Function to create the custom email generation UI
function createEmailGeneratorUI() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    container.style.width = '300px';
    container.style.padding = '20px';
    container.style.backgroundColor = '#f9f9f9';
    container.style.border = '1px solid #ccc';
    container.style.boxShadow = '0 0 10px rgba(43,49,55,0.3)';
    container.style.borderRadius = '10px';
    container.style.zIndex = '1000';
    container.style.display = 'none'; // Initially hidden
    document.body.appendChild(container);
  
    // Create the input for the email subject
    const subjectInput = document.createElement('input');
    subjectInput.type = 'text';
    subjectInput.placeholder = 'Enter email subject';
    subjectInput.style.width = '90%';
    subjectInput.style.marginBottom = '10px';
    subjectInput.style.padding = '10px';
    subjectInput.style.fontFamily = 'Arial, sans-serif';
    subjectInput.style.fontSize = '14px';
    subjectInput.style.border = '1px solid #ccc';
    subjectInput.style.borderRadius = '5px';
    container.appendChild(subjectInput);
  
    // Create the div for the AI-generated email
    const emailOutput = document.createElement('div');
    emailOutput.style.position = 'relative'; // Added for positioning the copy button
    emailOutput.style.width = '100%';
    emailOutput.style.height = '150px';
    emailOutput.style.border = '1px solid #ccc';
    emailOutput.style.padding = '10px';
    emailOutput.style.fontFamily = 'Arial, sans-serif';
    emailOutput.style.fontSize = '12px'; // Smaller font size
    emailOutput.style.borderRadius = '5px';
    emailOutput.style.overflowY = 'scroll';
    emailOutput.style.backgroundColor = '#fff';
    emailOutput.style.whiteSpace = 'pre-wrap'; // Preserve formatting
    container.appendChild(emailOutput);
  
    // Create the button to copy the generated email content
    // Create the button to copy the generated email content



  
    // Create the button to generate the email
    const generateButton = document.createElement('button');
    generateButton.textContent = 'Generate Email';
    generateButton.style.width = '100%';
    generateButton.style.marginTop = '10px';
    generateButton.style.padding = '10px';
    generateButton.style.fontFamily = 'Arial, sans-serif';
    generateButton.style.fontSize = '14px';
    generateButton.style.border = 'none';
    generateButton.style.borderRadius = '5px';
    generateButton.style.backgroundColor = '#d3d3d3';
    generateButton.style.color = 'black';
    generateButton.style.cursor = 'pointer';
    generateButton.addEventListener('mouseover', () => {
      generateButton.style.backgroundColor = '#A9A9A9';
    });
    generateButton.addEventListener('mouseout', () => {
      generateButton.style.backgroundColor = '#d3d3d3';
    });
    container.appendChild(generateButton);

    const copyButton = document.createElement('button');
copyButton.textContent = 'Copy to Clipboard';
copyButton.style.width = '100%';
copyButton.style.marginTop = '10px';
copyButton.style.padding = '10px';
copyButton.style.fontFamily = 'Arial, sans-serif';
copyButton.style.fontSize = '14px';
copyButton.style.border = 'none';
copyButton.style.borderRadius = '5px';
copyButton.style.backgroundColor = '#008CBAtp.';
copyButton.style.color = '#fff';
copyButton.style.cursor = 'pointer';
copyButton.addEventListener('mouseover', () => {
  copyButton.style.backgroundColor = '#007bb5';
});
copyButton.addEventListener('mouseout', () => {
  copyButton.style.backgroundColor = '#008CBA';
});
container.appendChild(copyButton);

// Function to copy email content to clipboard
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '50px';
    toast.style.right = '20px';
    toast.style.padding = '10px 20px';
    toast.style.backgroundColor = '#333';
    toast.style.color = '#fff';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    toast.style.zIndex = '1001';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';

    document.body.appendChild(toast);
    
    // Show the toast
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 100);

    // Hide the toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  // Function to copy email content to clipboard
  copyButton.addEventListener('click', () => {
    const emailContent = emailOutput.textContent;
    navigator.clipboard.writeText(emailContent).then(() => {
      showToast('Email content copied to clipboard!');
    }).catch(err => {
      console.error('Error copying to clipboard:', err);
      showToast('Failed to copy email content.');
    });
  });
  
    // Create the button to close the container
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.width = '100%';
    closeButton.style.marginTop = '10px';
    closeButton.style.padding = '10px';
    closeButton.style.fontFamily = 'Arial, sans-serif';
    closeButton.style.fontSize = '14px';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.backgroundColor = '#FF5B61';
    closeButton.style.color = '#fff';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('mouseover', () => {
      closeButton.style.backgroundColor = '#FF474D';
    });
    closeButton.addEventListener('mouseout', () => {
      closeButton.style.backgroundColor = '#FF5B61';
    });
    closeButton.addEventListener('click', () => {
      container.style.display = 'none';
    });
    container.appendChild(closeButton);
  
    // Example function to generate email content (replace with your API call)
    const generateEmailContent = async (subject) => {
        const response = await fetch('http://localhost:3032/getEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subject: subject }) 
        });
        const resp = await response.json();
        const text = resp.candidates[0].content.parts[0].text;
        // console.log(text);
        return text;
      };
    
  
    // Generate email content when the button is clicked
    generateButton.addEventListener('click', async() => {
      const subject = subjectInput.value;
      if (subject) {
        const generatedEmail = await generateEmailContent(subject); // Replace with actual API call
        emailOutput.textContent = generatedEmail;
      } else {
        emailOutput.textContent = 'Please enter a subject.';
      }
    });
  
    return container;
  }
  
  // Function to create and insert the small button into the compose window
  function addButtonToCompose() {
    const composeWindow = document.querySelector('div[role="dialog"]');
    if (composeWindow && !composeWindow.querySelector('.custom-email-generator-button')) {
      const button = document.createElement('button');
      button.textContent = 'AI-EML';
      button.style.position = 'absolute';
      button.style.top = '10px';
      button.style.right = '10px';
      button.style.padding = '5px 10px';
      button.style.fontFamily = 'Arial, sans-serif';
      button.style.fontSize = '12px';
      button.style.border = 'none';
      button.style.borderRadius = '5px';
      button.style.backgroundColor = '#4CAF50';
      button.style.color = '#fff';
      button.style.cursor = 'pointer';
      button.classList.add('custom-email-generator-button');
      composeWindow.appendChild(button);
  
      const emailGeneratorUI = createEmailGeneratorUI();
  
      button.addEventListener('click', () => {
        emailGeneratorUI.style.display = 'block';
      });
    }
  }
  
  // MutationObserver to detect the compose window
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.querySelector('div[role="dialog"]')) {
              addButtonToCompose();
            }
          }
        });
      }
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  