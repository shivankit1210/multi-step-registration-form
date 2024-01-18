// App.tsx
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Correct import path
import * as yup from 'yup';
import { submitUser } from './store/userSlice';
import Step1Form from './components/Step1Form';
import Step2Form from './components/Step2Form';
import DataTable from './components/DataTable';
import Store from './store/Store';

const App = () => {
  const [formData, setFormData] = useState(null);

  const schema = yup.object().shape({
    // Define validation schema for the entire form if needed
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle form submission, dispatch action to submitUser, and clear formData
    Store.dispatch(submitUser(data));
    setFormData(null);
  };

  return (
    <Provider store={Store}>
      <Router>
        <Route path="/" exact>
          <Step1Form onNext={(data) => setFormData(data)} />
        </Route>
        <Route path="/step2" exact>
          <Step2Form onPrevious={() => setFormData(null)} onSubmit={handleSubmit(onSubmit)} />
        </Route>
        <Route path="/datatables" exact>
          <DataTable />
        </Route>
      </Router>
    </Provider>
  );
};

export default App;
