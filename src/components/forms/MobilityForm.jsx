import React from 'react';
import { useForm } from 'react-hook-form';
import { mobilitySchema } from '../../utils/validators'; 
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../ui/Input';
import Button from '../ui/Button';

const mobilityTypes = [
  { value: 'EXCHANGE', label: 'Échange' },
  { value: 'DOUBLE_DIPLOMA', label: 'Double Diplôme' },
  { value: 'INTERNSHIP', label: 'Stage' },
];

const mobilityStatuses = [
  { value: 'PENDING', label: 'En attente' },
  { value: 'APPROVED', label: 'Validé' },
  { value: 'REJECTED', label: 'Rejeté' },
];

const MobilityForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(mobilitySchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <label className="block font-medium mb-1">Programme</label>
        <Input {...register('program')} />
        {errors.program && <p className="text-red-600 text-sm">{errors.program.message}</p>}
      </div>

      <div>
        <label className="block font-medium mb-1">Type</label>
        <select {...register('type')} className="border p-2 rounded w-full">
          <option value="">Sélectionner un type</option>
          {mobilityTypes.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {errors.type && <p className="text-red-600 text-sm">{errors.type.message}</p>}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block font-medium mb-1">Date de début</label>
          <Input type="date" {...register('startDate')} />
          {errors.startDate && <p className="text-red-600 text-sm">{errors.startDate.message}</p>}
        </div>
        <div className="flex-1">
          <label className="block font-medium mb-1">Date de fin</label>
          <Input type="date" {...register('endDate')} />
          {errors.endDate && <p className="text-red-600 text-sm">{errors.endDate.message}</p>}
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Statut</label>
        <select {...register('status')} className="border p-2 rounded w-full">
          <option value="">Sélectionner un statut</option>
          {mobilityStatuses.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        {errors.status && <p className="text-red-600 text-sm">{errors.status.message}</p>}
      </div>

      {/* Ajoute ici si besoin des champs liés à student, academicYears... */}

      <div className="flex space-x-4">
        <Button type="submit" disabled={isSubmitting}>
          {initialData.id ? 'Mettre à jour' : 'Créer'}
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

export default MobilityForm;
