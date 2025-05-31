import React, { useEffect, useState } from 'react';
import { partnerService } from '../../services/partnerService';
import PartnerForm from '../../components/forms/PartnerForm';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Layout from '../../components/common/Layout';


const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    partnerService.getAll().then((res) => {
      setPartners(res.data || []);
      setLoading(false);
    }).catch(() => {
      setPartners([]);
      setLoading(false);
    });
  }, []);

  // Sauvegarder (créer ou modifier)
  const handleSave = async (partnerData) => {
    try {
      if (editingPartner) {
        const res = await partnerService.update(editingPartner.id, partnerData);
        setPartners((prev) =>
          prev.map((p) => (p.id === editingPartner.id ? res.data : p))
        );
      } else {
        const res = await partnerService.create(partnerData);
        setPartners((prev) => [...prev, res.data]);
      }
      setEditingPartner(null);
      setShowForm(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du partenaire', error);
    }
  };

  // Supprimer
  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      try {
        await partnerService.delete(id);
        setPartners((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression du partenaire', error);
      }
    }
  };

  // Modifier un partenaire : affiche le formulaire avec données
  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setShowForm(true);
  };

  // Annuler le formulaire
  const handleCancel = () => {
    setEditingPartner(null);
    setShowForm(false);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4"   >
      <h1 className="text-2xl font-bold mb-4 text-center">Gestion des partenaires</h1>

      {/* Bouton pour afficher le formulaire si caché */}
      {!showForm && (
        <div className="flex justify-center mb-6">
           <Button onClick={() => setShowForm(true)}>Ajouter un partenaire</Button>
         </div>      )}

      {/* Formulaire visible uniquement si showForm=true */}
      {showForm && (
        <Card className="mb-6">
          <PartnerForm
            initialData={editingPartner}
            onSubmit={handleSave}
            onCancel={handleCancel}
          />
        </Card>
      )}

      {/* Tableau des partenaires */}
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nom complet</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Université</th>
            <th className="py-2 px-4 border-b">Pays</th>
            <th className="py-2 px-4 border-b">Échelle</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners.length > 0 ? (
            partners.map((partner) => (
              <tr key={partner.id}>
                <td className="py-2 px-4 border-b">{partner.fullName}</td>
                <td className="py-2 px-4 border-b">{partner.email}</td>
                <td className="py-2 px-4 border-b">{partner.universityName}</td>
                <td className="py-2 px-4 border-b">{partner.country}</td>
                <td className="py-2 px-4 border-b">{partner.gradingScale}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <Button variant="secondary" onClick={() => handleEdit(partner)}>
                    Éditer
                  </Button>
                  <Button variant="secondary" onClick={() => handleDelete(partner.id)}>
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-center text-gray-500">
                Aucun partenaire trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Partners;
