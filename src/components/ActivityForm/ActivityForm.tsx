import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface SimpleActivity {
  id?: string;
  sightCode: string;
  activityName: string;
  price: number;
  type?: string;
}

interface ActivityFormProps {
  activity: SimpleActivity | null;
  mode: string;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ activity, mode, onSave, onCancel }) => {
  const [formData, setFormData] = useState<SimpleActivity>(
    activity || {
      sightCode: '',
      activityName: '',
      price: 0,
      type: 'activity'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Transform data to match backend model
    const dataToSend: any = {
      sightCode: formData.sightCode,
      activities: {
        [formData.activityName]: formData.price
      },
      type: 'activity'
    };
    
    // For edit mode, include the ID
    if (mode === 'edit' && activity?.id) {
      dataToSend.id = activity.id;
    }
    
    onSave(dataToSend);
  };

  if (mode === 'view') {
    return (
      <div className="form-view">
        <div className="form-grid">
          <div className="form-field">
            <label>Activity Name</label>
            <p>{activity?.activityName}</p>
          </div>
          <div className="form-field">
            <label>Sight Code</label>
            <p>{activity?.sightCode}</p>
          </div>
        </div>
        <div className="form-field">
          <label>Price</label>
          <p>{activity?.price}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-grid">
        <div className="form-field">
          <label>Activity Name *</label>
          <input 
            type="text" 
            value={formData.activityName}
            onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
            required 
            placeholder="Enter activity name"
          />
        </div>
        <div className="form-field">
          <label>Sight Code *</label>
          <input 
            type="text" 
            value={formData.sightCode}
            onChange={(e) => setFormData({ ...formData, sightCode: e.target.value })}
            required 
            disabled={mode === 'edit'}
            placeholder="Enter sight code"
          />
        </div>
      </div>

      <div className="form-field">
        <label>Price *</label>
        <input 
          type="number" 
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
          step="0.01"
          min="0"
          required
          placeholder="Enter price"
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-cancel">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          <Save className="icon" />
          Save Activity
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;