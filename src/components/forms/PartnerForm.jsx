import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { partnerSchema } from '../../utils/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../ui/Input';
import Button from '../ui/Button';

const PartnerForm = ({ initialData = null, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(partnerSchema),
    defaultValues: initialData || {
      fullName: '',
      email: '',
      universityName: '',
      country: '',
      gradingScale: '',
    },
  });

  useEffect(() => {
    reset(initialData || {
      fullName: '',
      email: '',
      universityName: '',
      country: '',
      gradingScale: '',
    });
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Nom complet</label>
        <Input {...register('fullName')} />
        {errors.fullName && (
          <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Email</label>
        <Input type="email" {...register('email')} />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Université</label>
        <Input {...register('universityName')} />
        {errors.universityName && (
          <p className="text-red-600 text-sm mt-1">{errors.universityName.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Pays</label>
        <Input {...register('country')} />
        {errors.country && (
          <p className="text-red-600 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Échelle de notation</label>
        <Input {...register('gradingScale')} />
        {errors.gradingScale && (
          <p className="text-red-600 text-sm mt-1">{errors.gradingScale.message}</p>
        )}
      </div>

      <div className="flex space-x-4">
        <Button type="submit" disabled={isSubmitting}>
          {initialData ? 'Mettre à jour' : 'Ajouter'}
        </Button>
        {onCancel && (
          <Button variant="secondary" type="button" onClick={onCancel}>
            Annuler
          </Button>
        )}
      </div>
    </form>
  );
};

export default PartnerForm;
