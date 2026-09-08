document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const successBox = document.getElementById("form-success-box");

  if (!form) {
    console.error("Contact form not found.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validateForm(form)) {
      return;
    }

    const submitButton = form.querySelector(
      'button[type="submit"]'
    );

    const originalButtonHTML = submitButton
      ? submitButton.innerHTML
      : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "Sending...";
    }

    try {
      const formData = {
        fullName:
          document.getElementById("full-name")?.value.trim() || "",

        email:
          document.getElementById("email")?.value.trim() || "",

        instagramId:
          document.getElementById("instagram-id")?.value.trim() || "",


        companyName:
          document.getElementById("company-name")?.value.trim() || "",

        service:
          document.getElementById("service-select")?.value.trim() || "",

        budget:
          document.getElementById("budget-select")?.value.trim() || "",

        timeline:
          document.getElementById("timeline-select")?.value.trim() || "",

        projectDescription:
          document.getElementById("project-description")?.value.trim() || "",

        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Prevent "Unexpected end of JSON input"
      // if the server returns an empty/non-JSON response.
      const contentType = response.headers.get("content-type") || "";

      let result;

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();

        throw new Error(
          `Server returned an unexpected response (${response.status}). ${text || "The backend may not be running."}`
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to send your message."
        );
      }

      // Success
      form.reset();
      form.style.display = "none";

      if (successBox) {
        successBox.style.display = "block";

        successBox.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }

    } catch (error) {
      console.error("Contact form error:", error);

      alert(
        error.message ||
        "Something went wrong while sending your message."
      );

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
      }
    }
  });

  const fields = form.querySelectorAll(
    "input, textarea, select"
  );

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      clearFieldError(field);
    });

    field.addEventListener("change", () => {
      clearFieldError(field);
    });
  });
});


// ==================================================
// VALIDATION
// ==================================================

function validateForm(form) {
  let isValid = true;

  // Full name
  const name = document.getElementById("full-name");

  if (name && !name.value.trim()) {
    showFieldError(name, "Please enter your full name.");
    isValid = false;
  } else if (name) {
    clearFieldError(name);
  }


  // Email
  const email = document.getElementById("email");

  if (email) {
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue) {
      showFieldError(
        email,
        "Please enter your email address."
      );
      isValid = false;

    } else if (!emailRegex.test(emailValue)) {
      showFieldError(
        email,
        "Please enter a valid email address."
      );
      isValid = false;

    } else {
      clearFieldError(email);
    }
  }


  // Instagram ID

  // Instagram ID (Optional)
  const instagram = document.getElementById("instagram-id");

  if (instagram) {
    const instagramValue = instagram.value.trim();
    const instagramUsername = instagramValue.replace(/^@/, "");
    const instagramRegex = /^[a-zA-Z0-9._]+$/;

    if (
      instagramValue &&
      (
        instagramUsername.length > 30 ||
        !instagramRegex.test(instagramUsername)
      )
    ) {
      showFieldError(
        instagram,
        instagramUsername.length > 30
          ? "Instagram ID must be 30 characters or less."
          : "Please enter a valid Instagram ID."
      );
      isValid = false;
    } else {
      clearFieldError(instagram);
    }
  }


  // Service
  const service =
    document.getElementById("service-select");

  if (service && !service.value.trim()) {
    showFieldError(
      service,
      "Please select a service."
    );
    isValid = false;

  } else if (service) {
    clearFieldError(service);
  }


  // Budget
  const budget =
    document.getElementById("budget-select");

  if (budget && !budget.value.trim()) {
    showFieldError(
      budget,
      "Please select your budget."
    );
    isValid = false;

  } else if (budget) {
    clearFieldError(budget);
  }


  // Project description
  const description =
    document.getElementById("project-description");

  if (description && !description.value.trim()) {
    showFieldError(
      description,
      "Please tell us about your project."
    );
    isValid = false;

  } else if (description) {
    clearFieldError(description);
  }


  // Consent
  const consent =
    document.getElementById("consent-check");

  if (consent && !consent.checked) {
    showFieldError(
      consent,
      "Please confirm that you agree to be contacted."
    );
    isValid = false;

  } else if (consent) {
    clearFieldError(consent);
  }


  return isValid;
}


// ==================================================
// ERROR HELPERS
// ==================================================

function showFieldError(field, message) {
  field.setAttribute("aria-invalid", "true");

  const parent = field.parentElement;

  if (!parent) return;

  let errorElement =
    parent.querySelector(".field-error");

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "field-error";

    errorElement.style.marginTop = "6px";
    errorElement.style.fontSize = "13px";

    parent.appendChild(errorElement);
  }

  errorElement.textContent = message;
}


function clearFieldError(field) {
  field.removeAttribute("aria-invalid");

  const parent = field.parentElement;

  if (!parent) return;

  const errorElement =
    parent.querySelector(".field-error");

  if (errorElement) {
    errorElement.remove();
  }
}