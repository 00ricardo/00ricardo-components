import * as yup from 'yup';
export default yup.object().shape({
  //lots: yup.string().required('Lot Field is required'),
  system: yup.string().required('System is required'),
});
