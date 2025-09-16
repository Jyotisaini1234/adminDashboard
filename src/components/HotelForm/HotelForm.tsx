import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { HotelFormProps, Hotels, Infant } from '../../types/types';

const HotelForm: React.FC<HotelFormProps> = ({ hotel, mode, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Hotels>( hotel || { hotel: { hotelName: '', location: { city: '', area: '', country: '' },description: '', imageUrl: '', availabilityStatus: true,isBestSeller: false,  starRating: 3, rooms: [] }} );
  const [activeRoomIndex, setActiveRoomIndex] = useState<number | null>(null);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(formData);};
  const addRoom = () => {
    const newRoom = { roomCategory: '',occupancyPricing: [], childPolicy: { infants: { ageRange: '0-2', price: '0' },children: [] } };
    setFormData({ ...formData, hotel: { ...formData.hotel, rooms: [...formData.hotel.rooms, newRoom] } });
    setActiveRoomIndex(formData.hotel.rooms.length);
  };

  const removeRoom = (index: number) => {
    const newRooms = formData.hotel.rooms.filter((_, i) => i !== index);
    setFormData({ ...formData, hotel: { ...formData.hotel, rooms: newRooms }});
    setActiveRoomIndex(null);
  };

  const updateRoom = (roomIndex: number, updatedRoom: any) => {
    const newRooms = [...formData.hotel.rooms];
    newRooms[roomIndex] = updatedRoom;
    setFormData({ ...formData, hotel: { ...formData.hotel, rooms: newRooms } });
  };

  const addOccupancyPricing = (roomIndex: number) => {
    const newPricing = {occupancy: 1, startDate: '', endDate: '',price: 0, currency: 'USD', mealPlan: 'No Meal', status: 'Available', };
    const room = formData.hotel.rooms[roomIndex];
    const updatedRoom = {...room,occupancyPricing: [...room.occupancyPricing, newPricing] };
    updateRoom(roomIndex, updatedRoom);
  };
  const removeOccupancyPricing = (roomIndex: number, pricingIndex: number) => {
    const room = formData.hotel.rooms[roomIndex];
    const newPricing = room.occupancyPricing.filter((_, i) => i !== pricingIndex);
    const updatedRoom = { ...room, occupancyPricing: newPricing };
    updateRoom(roomIndex, updatedRoom);
  };

  const updateOccupancyPricing = (roomIndex: number, pricingIndex: number, field: string, value: any) => {
    const room = formData.hotel.rooms[roomIndex];
    const newPricing = [...room.occupancyPricing];
    newPricing[pricingIndex] = { ...newPricing[pricingIndex], [field]: value };
    const updatedRoom = { ...room, occupancyPricing: newPricing };
    updateRoom(roomIndex, updatedRoom);
  };
  const addChildPolicy = (roomIndex: number) => {
    const newChild = { ageRange: '3-12', price: '0' };
    const room = formData.hotel.rooms[roomIndex];
    const updatedRoom = { ...room, childPolicy: { ...room.childPolicy, children: [...room.childPolicy.children, newChild] }};
    updateRoom(roomIndex, updatedRoom);
  };
  const removeChildPolicy = (roomIndex: number, childIndex: number) => {
    const room = formData.hotel.rooms[roomIndex];
    const newChildren = room.childPolicy.children.filter((_: any, i: number) => i !== childIndex);
    const updatedRoom = { ...room, childPolicy: { ...room.childPolicy, children: newChildren }};
    updateRoom(roomIndex, updatedRoom);
  };
  const updateChildPolicy = (roomIndex: number, childIndex: number, field: string, value: string) => {
    const room = formData.hotel.rooms[roomIndex];
    const newChildren = [...room.childPolicy.children];
    newChildren[childIndex] = { ...newChildren[childIndex], [field]: value };
    const updatedRoom = {...room, childPolicy: { ...room.childPolicy, children: newChildren } }; updateRoom(roomIndex, updatedRoom);
  };
  const updateInfantPolicy = (roomIndex: number, field: keyof Infant, value: string) => {
    const room = formData.hotel.rooms[roomIndex];
    const updatedRoom = { ...room, childPolicy: { ...room.childPolicy,infants: { ...room.childPolicy.infants, [field]: value }}
    };
    updateRoom(roomIndex, updatedRoom);
  };

  if (mode === 'view') {
    return (
      <div className="form-view">
        <div className="form-grid">
          <div className="form-field">
            <label><strong>Hotel Name</strong></label>
            <p>{hotel?.hotel.hotelName}</p>
          </div>
          <div className="form-field">
            <label><strong>Star Rating</strong></label>
            <p>{hotel?.hotel.starRating} Stars</p>
          </div>
        </div>
        <div className="form-field">
          <label><strong>Location</strong></label>
          <p>{hotel?.hotel.location.city}, {hotel?.hotel.location.area}, {hotel?.hotel.location.country}</p>
        </div>
        <div className="form-field">
          <label><strong>Description</strong></label>
          <p>{hotel?.hotel.description}</p>
        </div>
        
        {/* Status and Badges */}
        <div className="form-grid">
          <div className="form-field">
            <label><strong>Status</strong></label>
            <p>{hotel?.hotel.availabilityStatus ? 'Available' : 'Not Available'}</p>
          </div>
          <div className="form-field">
            <label><strong>Best Seller</strong></label>
            <p>{hotel?.hotel.isBestSeller ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Rooms Information */}
        {hotel?.hotel.rooms && hotel.hotel.rooms.length > 0 && (
          <div className="rooms-section">
            <h3><strong>Rooms Information</strong></h3>
            {hotel.hotel.rooms.map((room, roomIndex) => (
              <div key={roomIndex} className="room-view-card">
                <h4>Room Category: {room.roomCategory}</h4>
                {/* Occupancy Pricing */}
                {room.occupancyPricing && room.occupancyPricing.length > 0 && (
                  <div className="pricing-section">
                    <h5><strong>Pricing Information</strong></h5>
                    {room.occupancyPricing.map((pricing, pIndex) => (
                      <div key={pIndex} className="pricing-card">
                        <div className="pricing-grid">
                          <p><strong>Occupancy:</strong> {pricing.occupancy} persons</p>
                          <p><strong>Price:</strong> {pricing.currency} {pricing.price}</p>
                          <p><strong>Meal Plan:</strong> {pricing.mealPlan}</p>
                          <p><strong>Check-in Date:</strong> {pricing.startDate}</p>
                          <p><strong>Check-out Date:</strong> {pricing.endDate}</p>
                          <p><strong>Status:</strong> {pricing.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Child Policy */}
                {room.childPolicy && (
                  <div className="child-policy-section">
                    <h5><strong>Child Policy</strong></h5>
                    <div className="child-policy-grid">
                      <p><strong>Infants ({room.childPolicy.infants?.ageRange}):</strong> {room.childPolicy.infants?.price}</p>
                      {room.childPolicy.children && room.childPolicy.children.length > 0 && (
                      <div><strong>Children:</strong> {room.childPolicy.children.map((child: { ageRange: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, cIndex: React.Key | null | undefined) => (  <p key={cIndex}>• Age {child.ageRange}: {child.price}</p>))}  </div> )}
                    </div>
                  </div>)}
              </div> ))}
          </div>)}
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div className="form-grid">
        <div className="form-field">
          <label>Hotel Name</label>
          <input type="text" value={formData.hotel.hotelName} onChange={(e) => setFormData({ ...formData, hotel: { ...formData.hotel, hotelName: e.target.value } })} required />
        </div>
        <div className="form-field">
          <label>Star Rating</label>
          <select value={formData.hotel.starRating} onChange={(e) => setFormData({ ...formData, hotel: { ...formData.hotel, starRating: parseInt(e.target.value) }  })} >  {[1, 2, 3, 4, 5].map(rating => ( <option key={rating} value={rating}> {rating} Star{rating > 1 ? 's' : ''}  </option> ))}  </select>
        </div>
      </div>
      <div className="form-grid-three">
        <div className="form-field">
          <label>City</label>
          <input type="text"  value={formData.hotel.location.city} onChange={(e) => setFormData({...formData, hotel: { ...formData.hotel,location: { ...formData.hotel.location, city: e.target.value }  } })} required/>
        </div>
        <div className="form-field">
          <label>Area</label>
          <input type="text" value={formData.hotel.location.area}  onChange={(e) => setFormData({ ...formData, hotel: { ...formData.hotel, location: { ...formData.hotel.location, area: e.target.value }}})} />
        </div>
        <div className="form-field">
          <label>Country</label>
          <input type="text" value={formData.hotel.location.country}onChange={(e) => setFormData({ ...formData,  hotel: {  ...formData.hotel, location: { ...formData.hotel.location, country: e.target.value }  } })} required/>
        </div>
      </div>
      <div className="form-field">
        <label>Description</label>
        <textarea value={formData.hotel.description} onChange={(e) => setFormData({...formData,  hotel: { ...formData.hotel, description: e.target.value }})} rows={4} />
      </div>
      <div className="form-field">
        <label>Image URL</label>
        <input type="url" value={formData.hotel.imageUrl} onChange={(e) => setFormData({...formData, hotel: { ...formData.hotel, imageUrl: e.target.value } })} />
      </div>
      <div className="form-grid">
        <div className="form-field checkbox-field">
          <input type="checkbox" id="availabilityStatus" checked={formData.hotel.availabilityStatus} onChange={(e) => setFormData({...formData,hotel: { ...formData.hotel, availabilityStatus: e.target.checked } })}/>
          <label htmlFor="availabilityStatus">Available</label>
        </div>
        <div className="form-field checkbox-field">
          <input type="checkbox" id="isBestSeller"checked={formData.hotel.isBestSeller} onChange={(e) => setFormData({ ...formData, hotel: { ...formData.hotel, isBestSeller: e.target.checked } })} />
          <label htmlFor="isBestSeller">Best Seller</label>
        </div>
      </div>

      {/* Rooms Management Section */}
      <div className="rooms-management-section">
        <div className="section-header">
          <h3>Rooms Management</h3>
          <button type="button" onClick={addRoom} className="btn btn-secondary"> <Plus className="icon" />Add Room</button>
        </div>
        {formData.hotel.rooms.map((room, roomIndex) => (
          <div key={roomIndex} className="room-form-card">
            <div className="room-header">
              <h4>Room {roomIndex + 1}</h4>
              <button  type="button" onClick={() => removeRoom(roomIndex)}  className="btn btn-danger-small" >
                <Trash2 className="icon" />
              </button>
            </div>

            <div className="form-field">
              <label>Room Category</label>
              <input type="text" value={room.roomCategory}  placeholder="e.g., Deluxe Room, Suite, Standard Room" onChange={(e) => {  let updatedRoom = { ...room, roomCategory: e.target.value }; updateRoom(roomIndex, updatedRoom); }} required  />
            </div>

          {/* Occupancy Pricing Section */}
          <div className="occupancy-section">
              <div className="subsection-header">
                <h5>Occupancy & Pricing</h5>
              <button type="button" onClick={() => addOccupancyPricing(roomIndex)}className="btn btn-small" > <Plus className="icon" />  Add Pricing</button>
          </div>
    {room.occupancyPricing.map((pricing, pricingIndex) => (
      <div key={pricingIndex} className="pricing-form-card">
      <div className="pricing-header">
        <span>Option {pricingIndex + 1}</span>
        <button type="button" onClick={() => removeOccupancyPricing(roomIndex, pricingIndex)}className="btn btn-danger-small" >
          <Trash2 className="icon" />
        </button>
      </div>
      <div className="form-grid">
        {/* Occupancy Dropdown */}
        <div className="form-field">
          <label>Occupancy</label>
          <select value={pricing.occupancy} onChange={(e) => updateOccupancyPricing(roomIndex, pricingIndex, "occupancy",parseInt(e.target.value) ) } > {[1, 2, 3, 4].map((num) => (<option key={num} value={num}> {num} Person{num > 1 ? "s" : ""} </option>))}
          </select>
        </div>

        {/* Price Input */}
        <div className="form-field">
          <label>Price per Night</label>
          <input  type="number" min="0"  value={pricing.price} onChange={(e) => updateOccupancyPricing( roomIndex, pricingIndex, "price", parseInt(e.target.value) ) }required/>
        </div>

        {/* Currency Dropdown */}
        <div className="form-field">
          <label>Currency</label>
          <select value={pricing.currency} onChange={(e) => updateOccupancyPricing(roomIndex, pricingIndex, "currency", e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>
      
      <div className="form-grid">
        {/* Check-in Date */}
        <div className="form-field">
          <label>Check-in Date</label>
          <input type="date"  value={pricing.startDate}  onChange={(e) => updateOccupancyPricing(roomIndex, pricingIndex, "startDate", e.target.value)} required/>
        </div>

        {/* Check-out Date */}
        <div className="form-field">
          <label>Check-out Date</label>
          <input type="date"  value={pricing.endDate}  onChange={(e) => updateOccupancyPricing(roomIndex, pricingIndex, "endDate", e.target.value)}required/>
        </div>

        {/* Meal Plan */}
        <div className="form-field">
          <label>Meal Plan</label>
          <select value={pricing.mealPlan} onChange={(e) => updateOccupancyPricing(roomIndex, pricingIndex, "mealPlan", e.target.value)}>
            <option value="No Meal">No Meal</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Half Board">Half Board</option>
            <option value="Full Board">Full Board</option>
            <option value="All Inclusive">All Inclusive</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label>Status</label>
        <select value={pricing.status} onChange={(e) => updateOccupancyPricing(roomIndex, pricingIndex, "status", e.target.value)}>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
          <option value="Limited">Limited</option>
        </select>
      </div>
    </div> ))}
    </div>
            <div className="child-policy-section">
              <div className="subsection-header">
                <h5>Child Policy</h5>
                <button type="button"  onClick={() => addChildPolicy(roomIndex)}  className="btn btn-small" ><Plus className="icon" />  Add Child Age Group </button>
              </div>

              {/* Infant Policy */}
              <div className="infant-policy">
                <h6>Infant Policy</h6>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Age Range</label>
                    <input type="text" value={room.childPolicy?.infants?.ageRange || '0-2'}onChange={(e) => updateInfantPolicy(roomIndex, 'ageRange', e.target.value)}   placeholder="e.g., 0-2"/>
                  </div>
                  <div className="form-field">
                    <label>Price</label>
                    <input  type="text" value={room.childPolicy?.infants?.price || '0'} onChange={(e) => updateInfantPolicy(roomIndex, 'price', e.target.value)} placeholder="e.g., Free, 500, 50%" />
                  </div>
                </div>
              </div>

              {/* Children Policies */}
              {room.childPolicy?.children?.map( ( child: { ageRange: string | number | readonly string[] | undefined;  price: string | number | readonly string[] | undefined; }, childIndex: number ) => (
                <div key={childIndex} className="child-form-card">
                  <div className="child-header">
                    <span>Child Age Group {childIndex + 1}</span>
                    <button  type="button"onClick={() => removeChildPolicy(roomIndex, childIndex)} className="btn btn-danger-small">
                      <Trash2 className="icon" />
                    </button>
                  </div>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Age Range</label>
                      <input type="text" value={child.ageRange}onChange={(e) =>   updateChildPolicy(roomIndex, childIndex, 'ageRange', e.target.value) }placeholder="e.g., 3-12" required />
                    </div>
                    <div className="form-field">
                      <label>Price</label>
                      <input type="text" value={child.price} onChange={(e) =>updateChildPolicy(roomIndex, childIndex, 'price', e.target.value)  } placeholder="e.g., 1000, 50%, Free" required/>
                    </div>
                  </div>
                </div> ) )}
            </div>
          </div>
        ))}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-cancel">Cancel</button>
        <button type="submit" className="btn btn-primary"> <Save className="icon" /> Save Hotel </button>
      </div>
    </form>
  );
};
export default HotelForm;
