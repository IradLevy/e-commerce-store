import * as yup from 'yup';

// validation for each step of the checkout
export const validationSchema = [
    yup.object({ // for the address form
        fullName: yup.string().required('Full name is required'),
        address1: yup.string().required('Address line 1 is required'),
        address2: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required(),
        zip: yup.string().required(),
        country: yup.string().required(),
    }),
    yup.object(), // for the review, thats why there is not really a validation
    yup.object({
        nameOnCard: yup.string().required()
    })
]