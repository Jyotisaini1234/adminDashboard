import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { CarType } from '../../types/types';

interface CarTypeFormProps {
  carType: CarType | null;
  mode: string;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const CarTypeForm: React.FC<CarTypeFormProps> = ({ carType, mode, onSave, onCancel }) => {
  const [formData, setFormData] = useState<CarType>(carType || {sightCode: '', sightName: '', carType: '', maxAllowedPax: 4, price: 0,currency: 'USD', validFrom: '', validUntil: '' } );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (mode === 'view') {
    return (
      <div className="form-view">
        <div className="form-grid">
          <div className="form-field">
            <label>Car Type</label>
            <p>{carType?.carType}</p>
          </div>
          <div className="form-field">
            <label>Max Passengers</label>
            <p>{carType?.maxAllowedPax}</p>
          </div>
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label>Sight Name</label>
            <p>{carType?.sightName}</p>
          </div>
          <div className="form-field">
            <label>Price</label>
            <p>{carType?.price} {carType?.currency}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-grid">
        <div className="form-field">
          <label>Car Type</label>
          <input type="text" value={formData.carType} onChange={(e) => setFormData({ ...formData, carType: e.target.value })}  required />
        </div>
        <div className="form-field">
          <label>Sight Code</label>
          <input type="text" value={formData.sightCode} onChange={(e) => setFormData({ ...formData, sightCode: e.target.value })}required />
        </div>
      </div>

      <div className="form-field">
        <label>Sight Name</label>
        <input type="text"value={formData.sightName} onChange={(e) => setFormData({ ...formData, sightName: e.target.value })}required />
      </div>

      <div className="form-grid-three">
        <div className="form-field">
          <label>Max Passengers</label>
          <input type="number"  value={formData.maxAllowedPax} onChange={(e) => setFormData({ ...formData, maxAllowedPax: parseInt(e.target.value) || 0 })} min="1"  required />
        </div>
        <div className="form-field">
          <label>Price</label>
          <input type="number" value={formData.price}  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} step="0.01" min="0" required />
        </div>
        <div className="form-field">
          <label>Currency</label>
          <select value={formData.currency}  onChange={(e) => setFormData({ ...formData, currency: e.target.value })} >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>Valid From</label>
          <input type="date" value={formData.validFrom} onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })} />
        </div>
        <div className="form-field">
          <label>Valid Until</label>
          <input type="date" value={formData.validUntil} onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}/>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-cancel"> Cancel</button>
        <button type="submit" className="btn btn-primary"><Save className="icon" /> Save</button>
      </div>
    </form>
  );
};

export default CarTypeForm;