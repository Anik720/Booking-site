This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Installation
npm i


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Description 
* Search Selection: Users can choose between searching for hotels or flights using dropdown menu.
* Search Parameters: Depending on the selection, relevant input fields are displayed for users to input their search parameters. For hotel search, input fields include Check-In Date, Check-Out Date, City, Number of Rooms, Number of Adults, and Number of Children. For flight search, input fields include Departure City, Arrival City, Departure Date, Return Date, Number of Adults, and Number of Children.
* Search Button: A search button initiates the search based on the provided parameters.
* Form Validation:
   - Form validation ensures that users provide valid input. It displays appropriate error messages if any  required fields are not filled in correctly. Yup is used for that

* API Integration:
The application integrates with public flight and hotel booking APIs, such as Skyscanner API for flights and Booking.com API for hotels, or any other relevant APIs chosen by the developer. It makes API requests to fetch search results based on the user's input parameters.

* Search Results Display:
Search results are displayed in a user-friendly and organized manner. For hotels, available options with details such as name, price, and location are shown. For flights, available flight options with details like airline, price, and departure/arrival times are displayed.
