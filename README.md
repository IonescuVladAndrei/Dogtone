# Dogtone

Dogtone is an image processing app that lets you apply filters (greyscale, contrast, saturation or Sobel edge detection) to dog images — either fetched from an API or uploaded manually.

## ✨ Features

- Fetch random dog images from the [Dog CEO API](https://dog.ceo/)
- Upload your own image via file picker or drag & drop
- Apply image filters:
  - Greyscale (3 algorithms)
  - Sobel edge detection
  - Contrast adjustment
  - Saturation control
- Download processed images and view processing time
- Error handling for images and the Dog CEO API
- Spinners for asynchronous tasks

## 🛠 Tech Stack

- React + Vite
- Styled Components
- HTML Canvas API
- React Hooks + Context
- Json Server + Express

## 📦 Installation
```bash
git clone https://github.com/IonescuVladAndrei/Dogtone.git
cd dogtone
npm install

# Terminal 1: Start backend
npm run dev-b

# Terminal 2: Start frontend
npm run dev-f
```

## ✅ Project Requirements

This is a university project with the following requirements:

- Implement an image transformation technique using the Canvas API (I implemented multiple).
- The images can either be fetched from the [Dog CEO API](https://dog.ceo/) or uploaded from storage.
- The images are fetched using async and await.
- For image processing only low-level code and algorithms are allowed.
- Show processing time and implement the functionality of downloading the processed image.
- All fetch and image load errors are handled with informative error messages.
- The layout is required to be fully responsive for desktop and mobile screen sizes.
- The interface follows principles of UI learnability, efficiency, and safety.
- The application is required to have a login page.
- The code is commented to aid readability and maintainability.

## 💬 Comments & Screenshots

### Homepage

The homepage is divided into two main sections: the upper section, where users select an image and choose a filter to apply, and the lower section, which handles image loading and displays the processed result.

| Upper Section |
|-------------|
| ![Upper_Section Screenshot](https://drive.google.com/uc?export=view&id=1yBjt2FNmpgyeTrJQyRnIWLmSi_iIqS8j) | 

| Lower Section |
|-------------------|
| ![Lower_Section Screenshot](https://drive.google.com/uc?export=view&id=17wn2yuRvz-D6RC5N9KWF_QyS_cDwdTzQ) |


The upper section incorporates UI principles of learnability and efficiency. Experienced users can quickly select a filter for fast interaction, while new users can explore a collapsible section to learn about each process. This collapsible enhances learnability by providing explanations styled with the better-react-mathjax library, which formats the mathematical formulas used in image processing.<br>
The Contrast and Saturation filters use a slider paired with a numeric input to allow precise adjustment of each filter's value. The two inputs are synchronized, enabling users to either drag the slider or type a value directly for fine control over the image appearance. The numeric input was designed to adhere to the UI safety principle. If a user enters a non-numeric value, it reverts to the last valid entry. If the value exceeds the allowed range, it adjusts to the nearest valid limit. This behavior is implemented using the onBlur event.


| Upper Section |
|-------------------|
| ![Filters Screenshot](https://drive.google.com/uc?export=view&id=1KhulA2vIdwjSxwh-wkwMLyVVNprOrPrc) |

The lower section is divided into two rows: 
- one displaying the original and the processed image together with processing time and a download button (this layout helps users easily compare and identify the differences between the two images.)
- one for displaying the R,G,B values of pixels

| Lower Section |
|-------------------|
| ![Lower_Section Screenshot](https://drive.google.com/uc?export=view&id=1P_0fp9BmHm-acpxv5mHqyinnS7ea_MkF) |

This part of the page is for educational purposes and will render a matrix of squares where upon hovering over (or clicking on mobile) will display the individual red, green and blue numerical values.
In the description, the user is informed that at first they need to fetch a random dog image, choose the starting indexes (which are optional and depend on the size of the image and the matrix) and then press the run button.
Mobile mode will render a 4x4 matrix instead of 10x10 which will improve performance. The layout on small screens will still adapt correctly even when mobile mode is not active, it's just that the animation will be harder to follow. 
The animation is a cycle of highlighting each pixel from the initial image, replacing the variables and then highlighting each pixel from the final image.

https://github.com/user-attachments/assets/23adaab4-6523-427c-99ba-bb1363a3621a

For an image to be processed, it first needs to be fetched and loaded. The process button is disabled until the input image is successfully loaded, while the download button is available after the processing. 

| Before loading |
|-------------|
| ![Before_Loading Screenshot](https://drive.google.com/uc?export=view&id=10ZlBe38pwgeYMopTf_TAuEEgxdPdR0Er) |

| While loading |
|-------------------|
| ![After_Loading_Screenshot](https://drive.google.com/uc?export=view&id=15UOh8b_6WbH6Y0LEhkrbMibcwAwsMcH5) |

The user can also upload an image from storage with the ability to drag & drop or via file picker.

![Drag_And_Drop Screenshot](https://drive.google.com/uc?export=view&id=1lc1AFc6dyrCD-19-QxdouicLZdQRfLjV)

### Log in & Sign Up

One of the requirements was to implement a login page, but not necessarily make it functional. I decided to actually implement it using a json server in order to make it feel realistic without writing a full-fledged backend. The lognin page and signup are accessible by pressing on the round button which then displays 2 buttons for navigation or part of the email and a sign out button.

| Unauthenticated | Authenticated |
|-------------|-------------------|
| ![Unauthenticated Screenshot](https://drive.google.com/uc?export=view&id=1zwtxUr2ThrixF3m7IOzbS6CXKtduxZlY) | ![Authenticated Screenshot](https://drive.google.com/uc?export=view&id=1zq5pbqESeRv45xsPILm30X_lPjfbc6ad) |

For a signup to succeed, all form fields must be valid. Validation is performed both on the client side (interface) and the server side (JSON server) using regular expressions, which are stored in a shared folder to enable reuse across the application.

| Email validation  | Email length |
|-------------|-------------------|
| ![Email_Validation Screenshot](https://drive.google.com/uc?export=view&id=1QJegxv8XF4zXZNelpkyZ1eFqmMXlF8Yt) | ![Email_Length Screenshot](https://drive.google.com/uc?export=view&id=1lv1WFtDH_g31vYt23BreBUFBg9ukTkQo) |

First name and last name share validation logic.

| Name validation  | Name minimum length | Name maximum length |
|-------------|-------------------|-------------------|
| ![Name_Validation Screenshot](https://drive.google.com/uc?export=view&id=16KpHoLtuKIvwlIXAfIm1W7J41MWSavZ_) | ![Name_Minimum_Length Screenshot](https://drive.google.com/uc?export=view&id=1DzQpOEOBcrc7h_IEf5yq0wrWbkhE0bFg) | ![Name_Maximum_Length Screenshot](https://drive.google.com/uc?export=view&id=1e8ru2AKl1Z7VMBKCJpApXAA51-6613_6) |

To ensure a strong password, each requirement is displayed and changes color from red to green as it is met.

| Invalid password  | Valid password |
|-------------|-------------------|
| ![Invalid_Password Screenshot](https://drive.google.com/uc?export=view&id=1N8KPSfzmnMGkqECiuaRNGNUq3nssEgvk) | ![Valid_Password Screenshot](https://drive.google.com/uc?export=view&id=1VhK6y9BoCcbGX9P4D7p7SiPuLHJzdzT1) |

The login form also contains field validation.

| Empty email  | Empty password |
|-------------|-------------------|
| ![Empty_Email Screenshot](https://drive.google.com/uc?export=view&id=1zq7JhnKYZveuZA6J59ONSsUO7mPg6Jel) | ![Empty_Password Screenshot](https://drive.google.com/uc?export=view&id=1mrbj1KJQsrHqhcdp8DBrsfYQMab4gbm6) |

For server-side validation, beyond checking the individual fields, the sign-up process verifies that the email isn't already associated with an existing account, while the sign-in process confirms that the provided credentials are correct.

| Sign up  | Log in |
|-------------|-------------------|
| ![Failed_Sign_Up_Screenshot](https://drive.google.com/uc?export=view&id=1xz_rPFvZZ8GcHre_HY73ok_d4QIgWB6W) | ![Failed_Log_In Screenshot](https://drive.google.com/uc?export=view&id=1wctJB0zL75FW8Weyy1j3vBw82MyA8sHB) |

### Page Not Found

A page to handle unknown routes was implemented improving user experience and to adhere to UI safety principle. It contains two buttons, one for going to the previous route and one for homepage.

| Desktop  | Mobile |
|-------------|-------------------|
| ![Page_Not_Found_Desktop Screenshot](https://drive.google.com/uc?export=view&id=1zlw_yfUfYivIKBrGXHMnghi9aIl63hhl) | ![Page_Not_Found_Mobile Screenshot](https://drive.google.com/uc?export=view&id=1LgLlhQOSd3oW9DV2HBXgJp_hve0WrFBM) |

### Error Handling

There are a number of errors that may occur throughout the app during image fetching, breed fetching, image loading or image upload.<br><br>

When fetching a dog image, the response may be invalid if it lacks the message or status fields, or if the status field is not equal to "success".
| Missing fields  | 
|-------------|
| ![Missing_Fields Screenshot](https://drive.google.com/uc?export=view&id=1-NqVADhpi8qAt11DVx9L1ihWU-RKdmx0) |

| Status field |
|-------------------|
| ![Status_Field Screenshot](https://drive.google.com/uc?export=view&id=1--k2ScGgYFpucLuckjBNFE9zp0AQOTwW) |

When fetching the list of dog breeds the response may be invalid if it lacks the message or status fields, or if the status field is not equal to "success". Aditionally when fetching a dog image based on the breed, the breed could be invalid.

| Missing fields  |
|-------------|
| ![Missing_Fields Screenshot](https://drive.google.com/uc?export=view&id=1-AkhnEbk482UhpjWU6fmZ7FSaLcqVTRm) |

| Status field |
|-------------------|
| ![Status_Field Screenshot](https://drive.google.com/uc?export=view&id=1-BnNF3w9HvVxG2jCzjmtpHHPCjyeyWIR) | 

| Invalid breed value |
|-------------------|
| ![Invalid_Breed Screenshot](https://drive.google.com/uc?export=view&id=1-LvN1BXivf_U58mgch1_PwhEp8llspqj) |

If the response includes an image that fails to load, or if the image uploaded is corrupted, the user is informed and has the ability to either fetch a new image or upload a different one.
| Load error  |
|-------------|
| ![Load_Error Screenshot](https://drive.google.com/uc?export=view&id=1-gzHaONexrUy-VjMdLWRQek8IDgsIUYb) |

| Corrupted image |
|-------------------|
| ![Corrupted_Image Screenshot](https://drive.google.com/uc?export=view&id=1-c9XKW5V-tR27Bg_riI26FspCZC58ol0) |

### UI Responsiveness

This project was developed as part of a programming course focused on UI design, where ensuring full responsiveness across both mobile and desktop devices was a key requirement. For this reason, I dedicated significant attention to ensuring the app remains fully functional and visually coherent even on very small screens, including those as narrow as 320px.<br><br>

Both the login and signup pages are fully responsive, with the forms centered on the screen to maintain visual balance across all devices. A 5-pixel margin on both the left and right ensures the layout remains clean and accessible, even on the smallest screens.

| Log in  | Sign up |
|-------------|-------------------|
| ![Log_In_Screenshot](https://drive.google.com/uc?export=view&id=1-mywYUmcgpxXJ-BB18GRhC_5PCBkXEZY) | ![Sign_Up Screenshot](https://drive.google.com/uc?export=view&id=1-kIaynImKd4yKjsrfOaj-DAG6gqG7BoI) | 

| Sign up on phone |
| -------------------|
| ![Sign_Up_On_Phone Screenshot](https://drive.google.com/uc?export=view&id=1-hag8LhjO4wcGHuAOmCtLT_vlD0NZPUV) |

The homepage maintains the same responsiveness, with the 2 main sections now being interlinked. Image frames are positioned based on their place within the process list, providing users with a clear and intuitive sequence of steps to follow when using the app.<br>
Each image frame allows the user to scroll horizontally to allow them to view a detailed image even when it doesn't fully fit within the visible area.<br>
The formulas within the collapsible element also adjust to layout changes, although handling them is somewhat more challenging due to limitations of the better-react-mathjax library. As a result, the file that defines the list of filters contains the most lines of code in the project.

| Image origin list  | Image Container |
|-------------|-------------------|
| ![Image_Origin Screenshot](https://drive.google.com/uc?export=view&id=1-xSFMja3xZT9PPMZFUus3qzKZnjNANWI) | ![Image_Container Screenshot](https://drive.google.com/uc?export=view&id=1-xqyiycirxotQ4HBK5mS9N7W6wmwXir2) |

| Filter list  | Image Container |
|-------------|-------------------|
| ![Filter_List_Desktop Screenshot](https://drive.google.com/uc?export=view&id=1-zyX2DVTdpx51eXwhL3RVuToS6tsivwV) | ![Image_Container_Mobile Screenshot](https://drive.google.com/uc?export=view&id=1-hvZXpLALEHZHRGF-cqiiDA7siXuJV9l) |

### Code Documentation
The codebase contains various JSDoc-style documentation to improve readability and provide clear explanations of reusable UI components, API calls, routes and helper functions.

| Reusable UI component |
| -------------------|
| ![Reusable_UI_Component Screenshot](https://drive.google.com/uc?export=view&id=10AeKyyHRICVVIrjek5DRNTj2QTfNeHze) |

| API |
| -------------------|
| ![API Screenshot](https://drive.google.com/uc?export=view&id=10IB_1BPwAiniIM05JTZTd6p0N8Wslo3i) |

| Route |
| -------------------|
| ![Route Screenshot](https://drive.google.com/uc?export=view&id=10HhVwiscOtw_Rd03I3KXmdwHJT7dP-oJ) |

| Helper function |
| -------------------|
| ![Helper_Function Screenshot](https://drive.google.com/uc?export=view&id=10HRyw4NpvCQyzxpmcPMlbY7uQ4PGVOH9) |
