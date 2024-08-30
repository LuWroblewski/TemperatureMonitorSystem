import * as yup from 'yup';

const sensorSchema = yup.object().shape({
  temperature: yup.number().required('Temperature is obligatory').strict(true),
  humidity: yup.number().required('humidity is obligatory').strict(true),
});

export { sensorSchema };
