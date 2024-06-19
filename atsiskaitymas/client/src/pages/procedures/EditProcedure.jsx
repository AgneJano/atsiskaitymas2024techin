import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import SyncLoader from 'react-spinners/SyncLoader';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/api';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 48px 16px;
`;

const Title = styled.h3`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 32px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  max-width: 400px;
  &::placeholder {
    color: #d9d9d9;
    font-size: 1rem;
  }
  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #7ab8bf;
  color: #ffffff; /* White text color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  max-width: 400px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  &:hover {
    background-color: #3e848c;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const ErrorMessage = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: #990000;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const TypeSelect = styled.select`
  height: 40px;
  padding: 5px;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 4px;
  outline: none;
  color: #333333;
  font-size: 16px;
  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const EditProcedure = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    duration: '',
    image: '',
    price: 0,
  });

  useEffect(() => {
    const fetchProcedure = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/procedures/${id}`);
        const data = response.data[0];
        setFormData({
          title: data.title || '',
          category: data.category || '',
          duration: data.duration || '',
          image: data.image || '',
          price: data.price || 0,
        });
      } catch (error) {
        console.error('Error fetching procedure:', error);
      }
    };

    fetchProcedure();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      title: formData.title,
      category: formData.category,
      duration: formData.duration,
      image: formData.image,
      price: formData.price,
    },
  });

  useEffect(() => {
    setValue('title', formData.title);
    setValue('category', formData.category);
    setValue('duration', formData.duration);
    setValue('image', formData.image);
    setValue('price', formData.price);
  }, [formData, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await axios.patch(`${BASE_URL}/procedures/update/${id}`, {
        title: data.title,
        category: data.category,
        duration: data.duration,
        image: data.image,
        price: data.price,
      });

      navigate('/procedures');
    } catch (error) {
      console.error('Error updating procedure:', error);
      setError('api', {
        message: 'Error updating procedure: ' + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Edit Procedure</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            {...register('title', {
              required: 'Procedure title is required.',
              minLength: {
                value: 2,
                message: 'Procedure title must be between 2 and 50 characters long.',
              },
              maxLength: {
                value: 50,
                message: 'Procedure title must be between 2 and 50 characters long.',
              },
            })}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </FormField>
        <FormField>
          <Label>Category</Label>
          <TypeSelect {...register('category')}>
            <option value="face">Face</option>
            <option value="hair">Hair</option>
            <option value="body">Body</option>
            <option value="nails">Nails</option>
          </TypeSelect>
        </FormField>
        <FormField>
          <Label>Duration</Label>
          <Input
            type="text"
            name="duration"
            {...register('duration', {
              required: 'Duration is required.',
            })}
          />
          {errors.duration && <ErrorMessage>{errors.duration.message}</ErrorMessage>}
        </FormField>
        <FormField>
          <Label>Image URL</Label>
          <Input
            type="text"
            name="image"
            {...register('image', {
              required: 'Image URL is required.',
            })}
          />
          {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
        </FormField>
        <FormField>
          <Label>Price</Label>
          <Input
            type="number"
            name="price"
            {...register('price', {
              required: 'Price is required.',
              valueAsNumber: true,
              validate: {
                positive: (value) => value > 0 || 'Price must be a positive number.',
              },
            })}
          />
          {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
        </FormField>

        {errors.api && <ErrorMessage>{errors.api.message}</ErrorMessage>}
        {loading ? (
          <LoadingContainer>
            <SyncLoader size={8} color={'#ffffff'} />
          </LoadingContainer>
        ) : (
          <Button type="submit" disabled={loading}>
            Update
          </Button>
        )}
      </StyledForm>
    </Container>
  );
};

export default EditProcedure;