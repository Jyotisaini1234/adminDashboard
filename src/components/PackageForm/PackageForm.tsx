import React, { useState } from 'react';
import { Save, Plus, Minus, Trash2 } from 'lucide-react';
import { PackageFormProps, TourPackage, HotelOption, Hotel, Transfer, Itinerary, Activity} from '../../types/types';
import './PackageForm.scss';

const PackageForm: React.FC<PackageFormProps> = ({ package: pkg, mode, onSave, onCancel }) => {
  const [formData, setFormData] = useState<TourPackage>( pkg || { packageDetails: {packageName: '',validity: { startDate: '', endDate: '' },country: '', destinations: [], travelDates: { start: '', end: '' }, passengers: { adult: 2, child: 0, infant: 0 }, hotelOption: [], activity: [],transfers: [],inclusions: [], exclusions: [],itinerary: [],cancellationPolicy: { before30Days: '', before21Days: '',before15Days: '', nonRefundablePeriods: '', notes: ''},importantNotes: [],img: '' }  } );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDestinationsChange = (value: string) => {
    const destinations = value.split(',').map(d => d.trim()).filter(d => d);
    setFormData({
      ...formData,
      packageDetails: { ...formData.packageDetails, destinations }
    });
  };

  const handleInclusionsChange = (value: string) => {
    const inclusions = value.split(',').map(d => d.trim()).filter(d => d);
    setFormData({
      ...formData,
      packageDetails: { ...formData.packageDetails, inclusions }
    });
  };

  const handleExclusionsChange = (value: string) => {
    const exclusions = value.split(',').map(d => d.trim()).filter(d => d);
    setFormData({
      ...formData,
      packageDetails: { ...formData.packageDetails, exclusions }
    });
  };

  const handleImportantNotesChange = (value: string) => {
    const importantNotes = value.split(',').map(d => d.trim()).filter(d => d);
    setFormData({
      ...formData,
      packageDetails: { ...formData.packageDetails, importantNotes }
    });
  };

  // Hotel Option Functions
  const addHotelOption = () => {
    const newHotelOption: HotelOption = {hotels: [],cnbCost: 0, cwbCost: 0,perPersonCost: 0,  totalPackageCost: 0 };
    setFormData({...formData,packageDetails: {...formData.packageDetails, hotelOption: [...formData.packageDetails.hotelOption, newHotelOption] }});};

  const removeHotelOption = (index: number) => {
    const updated = [...formData.packageDetails.hotelOption];
    updated.splice(index, 1);
    setFormData({ ...formData, packageDetails: { ...formData.packageDetails, hotelOption: updated }});};

  const updateHotelOption = (index: number, field: keyof HotelOption, value: any) => {
    const updated = [...formData.packageDetails.hotelOption];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData,packageDetails: { ...formData.packageDetails, hotelOption: updated } });};

  // Hotel Functions
  const addHotel = (hotelOptionIndex: number) => {
    const newHotel: Hotel = { name: '',  destination: '',star: 3, price: 0, currency: 'USD',img: '', nights: 1, mealPlan: '', roomType: '' };
    const updated = [...formData.packageDetails.hotelOption];
    updated[hotelOptionIndex].hotels = [...updated[hotelOptionIndex].hotels, newHotel];
    setFormData({ ...formData,packageDetails: { ...formData.packageDetails, hotelOption: updated }}); };

  // const removeHotel = (hotelOptionIndex: number, hotelIndex: number) => {
  //   const updated = [...formData.packageDetails.hotelOption];
  //   updated[hotelOptionIndex].hotels.splice(hotelIndex, 1);
  //   setFormData({...formData, packageDetails: { ...formData.packageDetails, hotelOption: updated } }); };

  const removeHotel = (hotelOptionIndex: number, hotelIndex: number) => {
    const updated = [...formData.packageDetails.hotelOption];
    updated[hotelOptionIndex] = {
      ...updated[hotelOptionIndex],
      hotels: updated[hotelOptionIndex].hotels.filter((_, index) => index !== hotelIndex)
    };
    setFormData({
      ...formData, 
      packageDetails: { ...formData.packageDetails, hotelOption: updated } 
    });
  };
  
  const updateHotel = (hotelOptionIndex: number, hotelIndex: number, field: keyof Hotel, value: any) => {
    const updated = [...formData.packageDetails.hotelOption];
    updated[hotelOptionIndex].hotels[hotelIndex] = { ...updated[hotelOptionIndex].hotels[hotelIndex], [field]: value };
    setFormData({ ...formData,packageDetails: { ...formData.packageDetails, hotelOption: updated } });};

  // Activity Functions
  const addActivity = () => {
    const newActivity: Activity = { name: '',type: '', vehicle: '', ticketIncluded: false, dropOff: '',sightCode: '',activityName: '', duration: '' };
    setFormData({...formData,packageDetails: {...formData.packageDetails, activity: [...formData.packageDetails.activity, newActivity] }});};

  const removeActivity = (index: number) => {
    const updated = [...formData.packageDetails.activity];
    updated.splice(index, 1);
    setFormData({...formData, packageDetails: { ...formData.packageDetails, activity: updated } });};

  const updateActivity = (index: number, field: keyof Activity, value: any) => {
    const updated = [...formData.packageDetails.activity];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData,packageDetails: { ...formData.packageDetails, activity: updated }});};

  // Transfer Functions
  const addTransfer = () => {
    const newTransfer: Transfer = { route: '',vehicle: '', type: ''};
    setFormData({...formData,packageDetails: {...formData.packageDetails, transfers: [...formData.packageDetails.transfers, newTransfer]}}); };

  const removeTransfer = (index: number) => {
    const updated = [...formData.packageDetails.transfers];
    updated.splice(index, 1);
    setFormData({ ...formData, packageDetails: { ...formData.packageDetails, transfers: updated }});};

  const updateTransfer = (index: number, field: keyof Transfer, value: any) => {
    const updated = [...formData.packageDetails.transfers];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData,packageDetails: { ...formData.packageDetails, transfers: updated } });};

  // Itinerary Functions
  const addItinerary = () => {
    const newItinerary: Itinerary = { day: formData.packageDetails.itinerary.length + 1,date: '', title: '', price: 0, details: ''};
    setFormData({...formData, packageDetails: {...formData.packageDetails,  itinerary: [...formData.packageDetails.itinerary, newItinerary]  } });};

  const removeItinerary = (index: number) => {
    const updated = [...formData.packageDetails.itinerary];
    updated.splice(index, 1);
    updated.forEach((item, i) => { item.day = i + 1;});
    setFormData({...formData, packageDetails: { ...formData.packageDetails, itinerary: updated } });};

  const updateItinerary = (index: number, field: keyof Itinerary, value: any) => {
    const updated = [...formData.packageDetails.itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({...formData, packageDetails: { ...formData.packageDetails, itinerary: updated }});};

  if (mode === 'view') {
    return (
      <div className="package-form-container view-mode">
        <h2 className="main-title">Package Details</h2>
        <div className="view-grid">
          <div>
            <label className="view-label">Package Name</label>
            <p className="view-text">{pkg?.packageDetails.packageName}</p>
          </div>
          <div>
            <label className="view-label">Country</label>
            <p className="view-text">{pkg?.packageDetails.country}</p>
          </div>
        </div>
        <div className="view-destinations">
          <label className="view-label">Destinations</label>
          <p className="view-text">{pkg?.packageDetails.destinations.join(', ')}</p>
        </div>
        {pkg?.packageDetails.img && (
          <div className="view-image-section">
            <label className="view-label">Package Image</label>
            <img src={pkg.packageDetails.img} alt="Package" className="package-image" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="package-form-container">
      <form onSubmit={handleSubmit} className="package-form">
        <h2 className="main-title">
          {mode === 'edit' ? 'Edit Package' : 'Add New Package'}
        </h2>

        {/* Basic Information */}
        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>
          <div className="input-grid">
            <div>
              <label className="input-label">Package Name *</label>
              <input type="text" className="form-input" value={formData.packageDetails.packageName} onChange={(e) => setFormData({ ...formData, packageDetails: { ...formData.packageDetails, packageName: e.target.value } })} required />
            </div>
            <div>
              <label className="input-label">Country *</label>
              <input type="text" className="form-input" value={formData.packageDetails.country} onChange={(e) => setFormData({ ...formData, packageDetails: { ...formData.packageDetails, country: e.target.value } })}required />
            </div>
          </div>

          <div className="full-width-input">
            <label className="input-label">Destinations (comma separated)</label>
            <input type="text" className="form-input" value={formData.packageDetails.destinations.join(', ')}  onChange={(e) => handleDestinationsChange(e.target.value)}  placeholder="e.g., Paris, London, Rome"/>
          </div>

          <div className="full-width-input">
            <label className="input-label">Image URL</label>
            <input type="url" className="form-input"value={formData.packageDetails.img}onChange={(e) => setFormData({...formData,packageDetails: { ...formData.packageDetails, img: e.target.value } })} />
          </div>
        </div>

        {/* Validity & Travel Dates */}
        <div className="form-section">
          <h3 className="section-title">Dates</h3>
          <div className="input-grid">
            <div>
              <label className="input-label">Valid From</label>
              <input type="date" className="form-input" value={formData.packageDetails.validity.startDate} onChange={(e) => setFormData({...formData, packageDetails: {...formData.packageDetails, validity: { ...formData.packageDetails.validity, startDate: e.target.value }}})} />
            </div>
            <div>
              <label className="input-label">Valid Until</label>
              <input type="date" className="form-input" value={formData.packageDetails.validity.endDate}onChange={(e) => setFormData({ ...formData, packageDetails: {...formData.packageDetails, validity: { ...formData.packageDetails.validity, endDate: e.target.value } }})}  />
            </div>
            <div>
              <label className="input-label">Travel Start Date</label>
              <input  type="date" className="form-input" value={formData.packageDetails.travelDates.start} onChange={(e) => setFormData({ ...formData, packageDetails: { ...formData.packageDetails, travelDates: { ...formData.packageDetails.travelDates, start: e.target.value } } })} />
            </div>
            <div>
              <label className="input-label">Travel End Date</label>
              <input type="date"  className="form-input" value={formData.packageDetails.travelDates.end} onChange={(e) => setFormData({...formData, packageDetails: { ...formData.packageDetails,  travelDates: { ...formData.packageDetails.travelDates, end: e.target.value } } })} />
            </div>
          </div>
        </div>

        {/* Passengers */}
        <div className="form-section">
          <h3 className="section-title">Passengers</h3>
          <div className="passenger-grid">
            <div>
              <label className="input-label">Adults</label>
              <input  type="number" className="form-input" value={formData.packageDetails.passengers.adult} onChange={(e) => setFormData({ ...formData, packageDetails: { ...formData.packageDetails,passengers: {...formData.packageDetails.passengers, adult: parseInt(e.target.value) || 0}} })} min="0"  />
            </div>
            <div>
              <label className="input-label">Children</label>
              <input type="number" className="form-input"value={formData.packageDetails.passengers.child} onChange={(e) => setFormData({...formData, packageDetails: {...formData.packageDetails, passengers: { ...formData.packageDetails.passengers, child: parseInt(e.target.value) || 0 } } })} min="0"/>
            </div>
            <div>
              <label className="input-label">Infants</label>
              <input type="number" className="form-input"value={formData.packageDetails.passengers.infant}  onChange={(e) => setFormData({ ...formData,  packageDetails: { ...formData.packageDetails, passengers: { ...formData.packageDetails.passengers, infant: parseInt(e.target.value) || 0 }} })} min="0" />
            </div>
          </div>
        </div>

        {/* Hotel Options */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">Hotel Options</h3>
            <button type="button" onClick={addHotelOption} className="add-button"  > <Plus size={16} /> Add Hotel Option</button>
          </div>
          {(formData.packageDetails.hotelOption || []).map((hotelOption, hotelOptionIndex) => (
            <div key={hotelOptionIndex} className="hotel-option-container">
              <div className="item-header">
                <h4 className="item-title">Hotel Option {hotelOptionIndex + 1}</h4>
                <button  type="button"  onClick={() => removeHotelOption(hotelOptionIndex)} className="delete-button" > <Trash2 size={16} />  </button>
              </div>
              
              <div className="cost-grid">
                <div>
                  <label className="input-label">CNB Cost</label>
                  <input  type="number" className="form-input" value={hotelOption.cnbCost}  onChange={(e) => updateHotelOption(hotelOptionIndex, 'cnbCost', parseInt(e.target.value) || 0)} />
                </div>
                <div>
                  <label className="input-label">CWB Cost</label>
                  <input  type="number" className="form-input" value={hotelOption.cwbCost}  onChange={(e) => updateHotelOption(hotelOptionIndex, 'cwbCost', parseInt(e.target.value) || 0)} />
                </div>
                <div>
                  <label className="input-label">Per Person Cost</label>
                  <input type="number" className="form-input"  value={hotelOption.perPersonCost} onChange={(e) => updateHotelOption(hotelOptionIndex, 'perPersonCost', parseInt(e.target.value) || 0)} />
                </div>
                <div>
                  <label className="input-label">Total Package Cost</label>
                  <input type="number"  className="form-input" value={hotelOption.totalPackageCost} onChange={(e) => updateHotelOption(hotelOptionIndex, 'totalPackageCost', parseInt(e.target.value) || 0)} />
                </div>
              </div>

              <div className="hotels-section">
                <div className="subsection-header">
                  <h5 className="subsection-title">Hotels</h5>
                  <button type="button" onClick={() => addHotel(hotelOptionIndex)} className="add-hotel-button"  >
                    <Plus size={12} /> Add Hotel
                  </button>
                </div>
                {(hotelOption.hotels || []).map((hotel, hotelIndex) => (
                  <div key={hotelIndex} className="hotel-container">
                    <div className="hotel-header">
                      <span className="hotel-title">Hotel {hotelIndex + 1}</span>
                      <button  type="button" onClick={() => removeHotel(hotelOptionIndex, hotelIndex)} className="remove-hotel-button"  >  <Minus size={14} />  </button>
                    </div>
                <div className="hotel-grid">
                  <div className="full-row">
                    <label className="hotel-label">Name</label>
                    <input type="text"className="hotel-input"  value={hotel.name}onChange={(e) => updateHotel(hotelOptionIndex, hotelIndex, "name", e.target.value) }/>
                  </div>
                
                  {/* Row 2 */}
                  <div className="full-row">
                    <label className="hotel-label">Destination</label>
                    <input type="text" className="hotel-input" value={hotel.destination} onChange={(e) => updateHotel(hotelOptionIndex, hotelIndex, "destination", e.target.value)} />
                  </div>
                
                  {/* Row 3 → Star & Price */}
                  <div className="two-col">
                    <div>
                      <label className="hotel-label">Star Rating</label>
                      <select className="hotel-input select_btn" value={hotel.star}  onChange={(e) => updateHotel( hotelOptionIndex, hotelIndex, "star",parseInt(e.target.value))}> {[1, 2, 3, 4, 5].map((star) => ( <option key={star} value={star}>  {star} Star</option>))} </select>
                    </div>
                    <div>
                      <label className="hotel-label">Price</label>
                      <input  type="number" className="hotel-input" value={hotel.price}onChange={(e) => updateHotel( hotelOptionIndex,  hotelIndex,"price", parseInt(e.target.value) || 0) } />
                    </div>
                  </div>
                
                  {/* Row 4 → Currency & Nights */}
                  <div className="two-col">
                    <div>
                      <label className="hotel-label">Currency</label>
                      <select className="hotel-input select_btn" value={hotel.currency}  onChange={(e) =>updateHotel(hotelOptionIndex, hotelIndex, "currency", e.target.value) } > <option value="USD">USD</option>  </select>
                    </div>
                    <div>
                      <label className="hotel-label">Nights</label>
                      <input type="number" className="hotel-input" value={hotel.nights} min="1" onChange={(e) => updateHotel(  hotelOptionIndex, hotelIndex, "nights", parseInt(e.target.value) || 0)}/>
                    </div>
                  </div>
                
                  <div className="full-row">
                    <label className="hotel-label">Meal Plan</label>
                    <select className="hotel-input select_btn_2"value={hotel.mealPlan} onChange={(e) =>updateHotel(hotelOptionIndex, hotelIndex, "mealPlan", e.target.value)} >
                      <option value="">Select Meal Plan</option>
                      <option value="BB">Bed & Breakfast</option>
                      <option value="HB">Half Board</option>
                      <option value="FB">Full Board</option>
                      <option value="AI">All Inclusive</option>
                    </select>
                  </div>
                
                  {/* Row 6 */}
                  <div className="full-row">
                    <label className="hotel-label">Room Type</label>
                    <input type="text" className="hotel-input"  value={hotel.roomType} placeholder="e.g., Double, Twin, Suite"onChange={(e) => updateHotel(hotelOptionIndex, hotelIndex, "roomType", e.target.value) } />
                  </div>
                
                  {/* Row 7 */}
                  <div className="full-row hotel-image-field">
                    <label className="hotel-label">Image URL</label>
                    <input type="url"  className="hotel-input" value={hotel.img}onChange={(e) => updateHotel(hotelOptionIndex, hotelIndex, "img", e.target.value) }/>
                  </div>
                </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Activities */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">Activities</h3>
            <button  type="button" onClick={addActivity} className="add-button"  >
              <Plus size={16} /> Add Activity
            </button>
          </div>
          {(formData.packageDetails.activity || []).map((activity, index) => (
            <div key={index} className="activity-container">
              <div className="item-header">
                <h4 className="item-title">Activity {index + 1}</h4>
                <button type="button"  onClick={() => removeActivity(index)}  className="delete-button">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="activity-grid">
                <div>
                  <label className="input-label">Activity Name</label>
                  <input  type="text" className="form-input" value={activity.name} onChange={(e) => updateActivity(index, 'name', e.target.value)} />
                </div>
                <div>
                  <label className="input-label">Type</label>
                  <input type="text" className="form-input" value={activity.type} onChange={(e) => updateActivity(index, 'type', e.target.value)} />
                </div>
                <div>
                  <label className="input-label">Vehicle</label>
                  <input type="text" className="form-input" value={activity.vehicle} onChange={(e) => updateActivity(index, 'vehicle', e.target.value)} />
                </div>
                <div>
                  <label className="input-label">Drop Off</label>
                  <input  type="text" className="form-input" value={activity.dropOff} onChange={(e) => updateActivity(index, 'dropOff', e.target.value)}/>
                </div>
                <div className="checkbox-container">
                  <input type="checkbox" id={`ticket-${index}`} className="checkbox-input"checked={activity.ticketIncluded} onChange={(e) => updateActivity(index, 'ticketIncluded', e.target.checked)}/>
                  <label htmlFor={`ticket-${index}`} className="checkbox-label">
                    Ticket Included
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transfers */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">Transfers</h3>
            <button type="button" onClick={addTransfer} className="add-button" > <Plus size={16} /> Add Transfer  </button>
          </div>
          {(formData.packageDetails.transfers || []).map((transfer, index) => (
            <div key={index} className="transfer-container">
              <div className="item-header">
                <h4 className="item-title">Transfer {index + 1}</h4>
                <button type="button" onClick={() => removeTransfer(index)} className="delete-button" ><Trash2 size={16} />  </button>
              </div>
              <div className="transfer-grid">
                <div>
                  <label className="input-label">Route</label>
                  <input type="text"  className="form-input" value={transfer.route} onChange={(e) => updateTransfer(index, 'route', e.target.value)} placeholder="e.g., Airport to Hotel" />
                </div>
                <div>
                  <label className="input-label">Vehicle</label>
                  <input type="text" className="form-input" value={transfer.vehicle} onChange={(e) => updateTransfer(index, 'vehicle', e.target.value)} placeholder="e.g., Private Car, Bus" />
                </div>
                <div>
                  <label className="input-label">Type</label>
                  <select className="form-input" value={transfer.type}  onChange={(e) => updateTransfer(index, 'type', e.target.value)}  >
                    <option value="">Select Type</option>
                    <option value="Private">Private</option>
                    <option value="Shared">Shared</option>
                    <option value="Public">Public</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Itinerary */}
        <div className="form-section">
          <div className="section-header">
            <h3 className="section-title">Itinerary</h3>
            <button type="button" onClick={addItinerary} className="add-button" > <Plus size={16} /> Add Day</button>
          </div>
          {(formData.packageDetails.itinerary || []).map((item, index) => (
            <div key={index} className="itinerary-container">
              <div className="item-header">
                <h4 className="item-title">Day {item.day}</h4>
                <button type="button" onClick={() => removeItinerary(index)}  className="delete-button" >  <Trash2 size={16} />  </button>
              </div>
              <div className="itinerary-grid">
                <div>
                  <label className="input-label">Date</label>
                  <input type="date"className="form-input" value={item.date}  onChange={(e) => updateItinerary(index, 'date', e.target.value)}/>
                </div>
                <div>
                  <label className="input-label">Title</label>
                  <input type="text"  className="form-input"  value={item.title} onChange={(e) => updateItinerary(index, 'title', e.target.value)} placeholder="e.g., Arrival in Paris" />
                </div>
                <div>
                  <label className="input-label">Price</label>
                  <input type="number"  className="form-input" value={item.price} onChange={(e) => updateItinerary(index, 'price', parseInt(e.target.value) || 0)} />
                </div>
              </div>
              <div className="itinerary-details">
                <label className="input-label">Details</label>
                <textarea  className="form-textarea" rows={3}  value={item.details} onChange={(e) => updateItinerary(index, 'details', e.target.value)}  placeholder="Describe the day's activities..." />
              </div>
            </div>
          ))}
        </div>

        {/* Inclusions & Exclusions */}
        <div className="form-section">
          <h3 className="section-title">Inclusions & Exclusions</h3>
          <div className="inclusions-grid">
            <div>
              <label className="input-label">Inclusions (comma separated)</label>
              <textarea className="form-textarea" rows={4} value={formData.packageDetails.inclusions.join(', ')} onChange={(e) => handleInclusionsChange(e.target.value)}  placeholder="e.g., Accommodation, Breakfast, Airport transfers" />
            </div>
            <div>
              <label className="input-label">Exclusions (comma separated)</label>
              <textarea className="form-textarea" rows={4} value={formData.packageDetails.exclusions.join(', ')}  onChange={(e) => handleExclusionsChange(e.target.value)} placeholder="e.g., International flights, Visa fees, Personal expenses"/>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="form-section">
          <h3 className="section-title">Cancellation Policy</h3>
          <div className="cancellation-grid">
            <div>
              <label className="input-label">Before 30 Days</label>
              <input type="text" className="form-input"value={formData.packageDetails.cancellationPolicy.before30Days} onChange={(e) => setFormData({ ...formData, packageDetails: {...formData.packageDetails,  cancellationPolicy: {...formData.packageDetails.cancellationPolicy,before30Days: e.target.value  } } })}  placeholder="e.g., 10% cancellation fee"/>
            </div>
            <div>
              <label className="input-label">Before 21 Days</label>
              <input type="text" className="form-input" value={formData.packageDetails.cancellationPolicy.before21Days} onChange={(e) => setFormData({...formData, packageDetails: {...formData.packageDetails, cancellationPolicy: {...formData.packageDetails.cancellationPolicy, before21Days: e.target.value } }})}  placeholder="e.g., 25% cancellation fee"  />
            </div>
            <div>
              <label className="input-label">Before 15 Days</label>
              <input  type="text"  className="form-input" value={formData.packageDetails.cancellationPolicy.before15Days} onChange={(e) => setFormData({ ...formData, packageDetails: {...formData.packageDetails, cancellationPolicy: { ...formData.packageDetails.cancellationPolicy, before15Days: e.target.value } } })}  placeholder="e.g., 50% cancellation fee" />
            </div>
            <div>
              <label className="input-label">Non-Refundable Periods</label>
              <input type="text" className="form-input"  value={formData.packageDetails.cancellationPolicy.nonRefundablePeriods} onChange={(e) => setFormData({...formData,packageDetails: {...formData.packageDetails,  cancellationPolicy: {...formData.packageDetails.cancellationPolicy, nonRefundablePeriods: e.target.value }} })} placeholder="e.g., Within 7 days of travel"/>
            </div>
          </div>
          <div className="cancellation-notes">
            <label className="input-label">Additional Notes</label>
            <textarea className="form-textarea"  rows={3}  value={formData.packageDetails.cancellationPolicy.notes} onChange={(e) => setFormData({...formData, packageDetails: {...formData.packageDetails, cancellationPolicy: {...formData.packageDetails.cancellationPolicy, notes: e.target.value}}})} placeholder="Additional cancellation policy details..." />
          </div>
        </div>

        {/* Important Notes */}
        <div className="form-section">
          <h3 className="section-title">Important Notes</h3>
          <div className="important-notes">
            <label className="input-label">Important Notes (comma separated)</label>
            <textarea className="form-textarea" rows={4} value={formData.packageDetails.importantNotes.join(', ')} onChange={(e) => handleImportantNotesChange(e.target.value)} placeholder="e.g., Valid passport required, Minimum 2 passengers, Weather dependent activities" />
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button" > Cancel </button>
          <button type="submit" className="save-button" > <Save size={16} /> Save Package</button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;