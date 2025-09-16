
import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { SightTour } from '../../types/types';

interface SightTourFormProps {
  sightTour: SightTour | null;
  mode: string;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const SightTourForm: React.FC<SightTourFormProps> = ({ sightTour, mode, onSave, onCancel }) => {
  const [formData, setFormData] = useState<SightTour>(sightTour || { city: '', state: '', country: '',  sightName: '', sightEntranceFee: 0, additionalSicPerPax: 0,  currency: 'USD',  eventDuration: '', isEntranceIncluded: false, validFrom: '',validUntil: '', cityId: '',sightCode: '', description: '',imgUrl:'',});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (mode === 'view') {
    return (
      <div className="form-view">
        <div className="form-grid">
          <div className="form-field">
            <label>Sight Name</label>
            <p>{sightTour?.sightName}</p>
          </div>
          <div className="form-field">
            <label>City</label>
            <p>{sightTour?.city}</p>
          </div>
          <div className="form-field">
            <label>Valid From</label>
            <p>{sightTour?.validFrom}</p>
          </div>
          <div className="form-field">
            <label>Valid Until</label>
            <p>{sightTour?.validUntil}</p>
          </div>
        </div>
        <div className="form-field">
          <label>Description</label>
          <p>{sightTour?.description}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-grid">
        <div className="form-field">
          <label>Sight Name*</label>
          <input type="text"  value={formData.sightName}  onChange={(e) => setFormData({ ...formData, sightName: e.target.value })}  required  />
        </div>
        <div className="form-field">
          <label>Sight Code*</label>
          <input  type="text"   value={formData.sightCode}  onChange={(e) => setFormData({ ...formData, sightCode: e.target.value })}  required   />
        </div>
      </div>

      <div className="form-grid-three">
        <div className="form-field">
          <label>City*</label>
          <input  type="text" value={formData.city}  onChange={(e) => setFormData({ ...formData, city: e.target.value })}  required  />
        </div>
        <div className="form-field">
          <label>State*</label>
          <input type="text"  value={formData.state}   onChange={(e) => setFormData({ ...formData, state: e.target.value })}  required />
        </div>
        <div className="form-field">
          <label>Country*</label>
          <input type="text"  value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}   required  />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>City ID*</label>
          <input type="text"  value={formData.cityId}  onChange={(e) => setFormData({ ...formData, cityId: e.target.value })}  required placeholder="Enter unique city identifier"/>
        </div>
        <div className="form-field">
          <label>Event Duration*</label>
          <input type="text"   value={formData.eventDuration} onChange={(e) => setFormData({ ...formData, eventDuration: e.target.value })}  placeholder="e.g., 2 hours, 1 day" required/>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>Valid From*</label>
          <input type="date"  value={formData.validFrom}  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })} required  />
        </div>
        <div className="form-field">
          <label>Valid Until*</label>
          <input type="date"  value={formData.validUntil}  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}   required />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>Entrance Fee</label>
          <input type="number"  value={formData.sightEntranceFee}  onChange={(e) => setFormData({ ...formData, sightEntranceFee: parseFloat(e.target.value) || 0 })}  step="0.01"    min="0"   />
        </div>
        <div className="form-field">
          <label>Additional SIC per Pax</label>
          <input type="number"  value={formData.additionalSicPerPax}  onChange={(e) => setFormData({ ...formData, additionalSicPerPax: parseFloat(e.target.value) || 0 })}  step="0.01" min="0"   />
        </div>
      </div>

      <div className="form-field">
        <label>Currency*</label>
        <select value={formData.currency}  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}  required >
          <option value="USD">USD</option>
        </select>
      </div>

      <div className="form-field">
        <label>Description</label>
        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}   rows={4}   placeholder="Enter sight tour description"/>
      </div>

      <div className="form-field">
        <label>Image URL</label>
        <input type="url"   value={formData.imgUrl || ''} onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}   placeholder="Enter image URL"/>
      </div>

      <div className="form-field checkbox-field">
        <input type="checkbox"  id="entranceIncluded" checked={formData.isEntranceIncluded}  onChange={(e) => setFormData({ ...formData, isEntranceIncluded: e.target.checked })}/>
        <label htmlFor="entranceIncluded">Entrance Included</label>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-cancel">  Cancel  </button>
        <button type="submit" className="btn btn-primary">  <Save className="icon" />  Save  </button>
      </div>
    </form>
  );
};

export default SightTourForm;
