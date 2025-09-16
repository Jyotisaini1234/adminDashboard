import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search,ChevronUp, ChevronDown,X, MapPin, Users, Car, Package, Hotel, Activity } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './AdminDashboard.scss';
import SightTourForm from '../SightTourForm/SightTourForm';
import CarTypeForm from '../CarTypeForm/CarTypeForm';
import ActivityForm from '../ActivityForm/ActivityForm';
import PackageForm from '../PackageForm/PackageForm';
import HotelForm from '../HotelForm/HotelForm';
import { closeModal, openModal, setSearchTerm, setActiveTab } from '../../slices/dashboardSlice';
import { useGetPackagesQuery, useGetSightToursQuery, useGetCarTypesQuery, useGetActivitiesQuery, useGetHotelsQuery, useCreatePackageMutation, useUpdatePackageMutation, useDeletePackageMutation, useCreateSightTourMutation, useUpdateSightTourMutation, useDeleteSightTourMutation, useCreateCarTypeMutation, useUpdateCarTypeMutation, useDeleteCarTypeMutation, useCreateActivityMutation, useUpdateActivityMutation, useDeleteActivityMutation, useCreateHotelMutation, useUpdateHotelMutation, useDeleteHotelMutation } from '../../services/api';
import { cityCountryList } from '../../types/types';

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeTab, isModalOpen, modalMode, selectedItem, searchTerm } = useAppSelector( (state) => state.dashboard);
  const [expandedActivities, setExpandedActivities] = useState<{[key: string]: boolean}>({});
  const { data: packages = [], isLoading: packagesLoading, error: packagesError } = useGetPackagesQuery();
  const { data: sightTours = [], isLoading: sightToursLoading, error: sightToursError } = useGetSightToursQuery();
  const { data: carTypes = [], isLoading: carTypesLoading, error: carTypesError } = useGetCarTypesQuery();
  const { data: activities = [], isLoading: activitiesLoading, error: activitiesError } = useGetActivitiesQuery(); // New query
  const { data: hotels = [], isLoading: hotelsLoading, error: hotelsError } = useGetHotelsQuery();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [createPackage] = useCreatePackageMutation();
  const [updatePackage] = useUpdatePackageMutation();
  const [deletePackage] = useDeletePackageMutation();
  const [createSightTour] = useCreateSightTourMutation();
  const [updateSightTour] = useUpdateSightTourMutation();
  const [deleteSightTour] = useDeleteSightTourMutation();
  const [createCarType] = useCreateCarTypeMutation();
  const [updateCarType] = useUpdateCarTypeMutation();
  const [deleteCarType] = useDeleteCarTypeMutation();
  const [createActivity] = useCreateActivityMutation();
  const [updateActivity] = useUpdateActivityMutation();
  const [deleteActivity] = useDeleteActivityMutation();
  const [createHotel] = useCreateHotelMutation();
  const [updateHotel] = useUpdateHotelMutation();
  const [deleteHotel] = useDeleteHotelMutation();


  const generateSuggestions = (inputValue: string) => { if (!inputValue.trim()) {return [];}
    const lowerInput = inputValue.toLowerCase();
    const citySuggestions = cityCountryList.filter(item => item.toLowerCase().includes(lowerInput) );
    const dataSuggestions: string[] = [];
    if (activeTab === 'packages') {
      packages.forEach((pkg: any) => {
        if (pkg.packageDetails.packageName.toLowerCase().includes(lowerInput)) {dataSuggestions.push(pkg.packageDetails.packageName);}
        if (pkg.packageDetails.country.toLowerCase().includes(lowerInput)) { dataSuggestions.push(pkg.packageDetails.country); }
      });
    } else if (activeTab === 'sight-tours') {
      sightTours.forEach((sight: any) => {
        if (sight.sightName.toLowerCase().includes(lowerInput)) { dataSuggestions.push(sight.sightName); }
        if (sight.city.toLowerCase().includes(lowerInput)) { dataSuggestions.push(sight.city);}
      });
    } else if (activeTab === 'hotels') {
      hotels.forEach((hotel: any) => {
        if (hotel.hotel.hotelName.toLowerCase().includes(lowerInput)) { dataSuggestions.push(hotel.hotel.hotelName); }
        if (hotel.hotel.location.city.toLowerCase().includes(lowerInput)) {dataSuggestions.push(hotel.hotel.location.city); }
        if (hotel.hotel.location.country.toLowerCase().includes(lowerInput)) { dataSuggestions.push(hotel.hotel.location.country);}
      });
    }
    const allSuggestions = [...citySuggestions, ...dataSuggestions];
    return Array.from(new Set(allSuggestions)).slice(0, 8);
  };
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchTerm(value));
    
    const newSuggestions = generateSuggestions(value);
    setSuggestions(newSuggestions);
    setShowSuggestions(newSuggestions.length > 0);
    setSelectedSuggestionIndex(-1);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setSearchTerm(suggestion));
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
  
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev =>  prev < suggestions.length - 1 ? prev + 1 : prev);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node) &&
          suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentLoadingState = () => {
    switch (activeTab) {
      case 'packages': return packagesLoading;
      case 'sight-tours': return sightToursLoading || carTypesLoading || activitiesLoading;
      case 'hotels': return hotelsLoading;
      default: return false;
    }
  };

  const getCurrentError = () => {
    switch (activeTab) {
      case 'packages': return packagesError;
      case 'sight-tours': return sightToursError || carTypesError || activitiesError;
      case 'hotels': return hotelsError;
      default: return null;
    }
  };
  const toggleActivitiesSection = (sightId: string) => {
    setExpandedActivities(prev => ({
      ...prev,
      [sightId]: !prev[sightId]
    }));
  };
  const filteredData = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    switch (activeTab) {
      case 'packages':
        return packages.filter(pkg =>
          pkg.packageDetails.packageName.toLowerCase().includes(lowerSearchTerm) ||
          pkg.packageDetails.country.toLowerCase().includes(lowerSearchTerm)
        );
      case 'sight-tours':
        return sightTours.filter(sight =>
          sight.sightName.toLowerCase().includes(lowerSearchTerm) ||
          sight.city.toLowerCase().includes(lowerSearchTerm)
        );
      case 'hotels':
        return hotels.filter(hotel =>
          hotel.hotel.hotelName.toLowerCase().includes(lowerSearchTerm) ||
          hotel.hotel.location.city.toLowerCase().includes(lowerSearchTerm) ||
          hotel.hotel.location.country.toLowerCase().includes(lowerSearchTerm)
        );
      default:
        return [];
    }
  }, [activeTab, searchTerm, packages, sightTours, hotels]);

const handleCreate = async (data: any) => {
  try {
    console.log('Sending data to server:', JSON.stringify(data, null, 2));
    if (data.type === 'car' || data.carType) {
      await createCarType(data).unwrap();
    } else if (data.type === 'activity' || data.activityName) {
      await createActivity(data).unwrap();
    } else {
      switch (activeTab) {
        case 'packages':
          await createPackage(data).unwrap();
          break;
        case 'sight-tours':
          console.log('Creating sight tour with data:', data);
          const requiredFields = ['city', 'state', 'country', 'sightName', 'currency', 'eventDuration', 'isEntranceIncluded', 'validFrom', 'validUntil', 'cityId', 'sightCode'];
          const missingFields = requiredFields.filter(field => {
            const value = data[field];
            return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
          });
          
          if (missingFields.length > 0) {
            console.error('Missing required fields:', missingFields);
            alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
            return;
          }
          if (data.validFrom && typeof data.validFrom === 'string') {
            const fromDate = new Date(data.validFrom);
            if (isNaN(fromDate.getTime())) {
              console.error('Invalid validFrom date:', data.validFrom);
              alert('Please enter a valid "Valid From" date');
              return;
            }
            data.validFrom = fromDate.toISOString().split('T')[0];
          }
          
          if (data.validUntil && typeof data.validUntil === 'string') {
            const untilDate = new Date(data.validUntil);
            if (isNaN(untilDate.getTime())) {
              console.error('Invalid validUntil date:', data.validUntil);
              alert('Please enter a valid "Valid Until" date');
              return;
            }
            data.validUntil = untilDate.toISOString().split('T')[0];
          }
          console.log('Final sight tour data being sent:', data);
          await createSightTour(data).unwrap();
          break;
        case 'hotels':
          await createHotel(data).unwrap();
          break;
      }
    }
    dispatch(closeModal());
  } catch (error: any) {
    console.error('Error creating:', error);
    let errorMessage = 'An error occurred while creating the item.';
    if (error?.data?.error) {
      errorMessage = error.data.error;
    } else if (error?.message) {
      errorMessage = error.message;
    }
    
    alert(`Error: ${errorMessage}`);
  }
};

  const handleUpdate = async (id: string | number, data: any) => {
    try {
      if (data.type === 'car' || data.carType) {
        await updateCarType({ id: String(id), data }).unwrap();
      } else if (data.type === 'activity' || data.activityName) {
        await updateActivity({ id: String(id), data }).unwrap();
      } else {
        switch (activeTab) {
          case 'packages':
            await updatePackage({ id: String(id), data }).unwrap();
            break;
          case 'sight-tours':
            await updateSightTour({ id: String(id), data }).unwrap();
            break;
          case 'hotels':
            await updateHotel({ id: String(id), data }).unwrap();
            break;
        }
      }
      dispatch(closeModal());
    } catch (error) {
      console.error('Error updating:', error);
    }
  };
  
  const handleDelete = async (id: string | number, itemType?: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (itemType === 'car') {
          await deleteCarType(String(id)).unwrap();
        } else if (itemType === 'activity') {
          await deleteActivity(String(id)).unwrap();
        } else {
          switch (activeTab) {
            case 'packages':
              await deletePackage(String(id)).unwrap();
              break;
            case 'sight-tours':
              await deleteSightTour(String(id)).unwrap();
              break;
            case 'hotels':
              await deleteHotel(String(id)).unwrap();
              break;
          }
        }
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };
  
  const openModalHandler = (mode: 'create' | 'edit' | 'view', item?: any) => {
    dispatch(openModal({ mode, item }));
  };

  const renderTabContent = () => {
    const isEmpty = filteredData.length === 0;
    const originalData = activeTab === 'packages' ? packages : activeTab === 'sight-tours' ? sightTours : hotels;
    switch (activeTab) {
      case 'packages':
        return (
          <div className="content-list">
            {isEmpty ? (
              <div className="empty-state">
                {originalData.length === 0 ? 'No packages found. Click "Add New" to create your first package.' : 'No packages match your search.'}
              </div>
            ) : (
              filteredData.map((pkg: any) => (
                <div key={pkg.id} className="item-card">
                  <div className="item-content">
                    <div className="item-main">
                      {pkg.packageDetails.img && ( <img src={pkg.packageDetails.img} alt="Package" className="item-image" /> )}
                      <div className="item-info">
                        <h3 className="item-title">{pkg.packageDetails.packageName}</h3>
                        <p className="item-subtitle">{pkg.packageDetails.country}</p>
                        <div className="item-meta">
                          <span className="meta-item">
                            <MapPin className="meta-icon" />
                            {pkg.packageDetails.destinations.length} destinations
                          </span>
                          <span className="meta-item">
                            <Users className="meta-icon" />
                            {pkg.packageDetails.passengers.adult + pkg.packageDetails.passengers.child} passengers
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => openModalHandler('view', pkg)} className="action-btn view-btn" title="View"> <Eye className="icon" /> </button>
                      <button onClick={() => openModalHandler('edit', pkg)} className="action-btn edit-btn" title="Edit"> <Edit className="icon" /> </button>
                      <button onClick={() => handleDelete(pkg.id!)} className="action-btn delete-btn" title="Delete"> <Trash2 className="icon" />  </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case 'sight-tours':
        return (
          <div className="unified-sight-layout">
            {isEmpty ? (
              <div className="empty-state">
                {originalData.length === 0 ? 'No sight tours found. Click "Add New" to create your first sight tour.' : 'No sight tours match your search.'}
              </div>
            ) : (
              filteredData.map((sight: any) => {
                const relatedCars = carTypes.filter((car: any) => car.sightCode === sight.sightCode);
                const relatedActivities = activities.filter((activity: any) => activity.sightCode === sight.sightCode);
                
                return (
                  <div key={sight.id} className="unified-sight-card">
                    <div className="sight-main-card">
                      {/* {sight.imgUrl && (
                        <img src={sight.imgUrl} alt={sight.sightName} className="sight-image" />
                      )} */}
                      <div className="sight-content">
                        <div className="sight-header">
                          <h3 className="sight-title">{sight.sightName}</h3>
                          <span className="sight-code">Code: {sight.sightCode}</span>
                        </div>
                        <p className="sight-location">{sight.city}, {sight.state}, {sight.country}</p>
                        <div className="sight-meta">
                          <span className="meta-item">Duration: {sight.eventDuration}</span>
                          <span className={`status ${sight.isEntranceIncluded ? 'included' : 'not-included'}`}> {sight.isEntranceIncluded ? 'Entrance Included' : 'Entrance Not Included'}</span>
                          <button onClick={() => openModalHandler('view', sight)} className="action-btn view-btn" title="View"> <Eye className="icon" /></button>
                          <button onClick={() => openModalHandler('edit', sight)} className="action-btn edit-btn" title="Edit"> <Edit className="icon" /></button>
                          <button onClick={() => handleDelete(sight.id!)} className="action-btn delete-btn" title="Delete"><Trash2 className="icon" /></button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Car Types Section */}
                    <div className="car-types-section">
                      <div className="car-types-header">
                        <Car className="icon" />
                        <h4>Available Car Types ({relatedCars.length})</h4>
                        <button  onClick={() => openModalHandler('create', { sightCode: sight.sightCode, sightName: sight.sightName, type: 'car' })}  className="btn-small btn-primary" > <Plus className="icon-small" /> Add Car Type </button>
                      </div>
                      
                      {relatedCars.length > 0 ? (
                        <div className="car-types-grid">
                          {relatedCars.map((car: any) => (
                            <div key={car.id} className="car-type-card">
                              <div className="car-type-content">
                                <div className="car-type-info">
                                  <h5 className="car-type-name">{car.carType}</h5>
                                  <div className="car-type-details">
                                    <span className="car-detail">Max {car.maxAllowedPax} pax </span>
                                    <span className="car-price">{car.price} {car.currency}</span>
                                  </div>
                                </div>
                                <div className="car-type-actions">
                                  <button onClick={() => openModalHandler('view', { ...car, type: 'car' })} className="action-btn-small view-btn" title="View"><Eye className="icon-small" />  </button>
                                  <button onClick={() => openModalHandler('edit', { ...car, type: 'car' })} className="action-btn-small edit-btn" title="Edit"> <Edit className="icon-small" /> </button>
                                  <button onClick={() => handleDelete(car.id!, 'car')} className="action-btn-small delete-btn" title="Delete"> <Trash2 className="icon-small" /></button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-cars-message"> No car types available for this sight. Click "Add Car Type" to add one. </div>
                      )}
                    </div>

  <div className="activities-section collapsible">
  <div className="activities-header clickable" onClick={() => toggleActivitiesSection(sight.id)} >
    <Activity className="icon" />
    <h4>Available Activities ({relatedActivities.reduce((total: number, activityGroup: any) => {
      return total + (activityGroup.activities ? Object.keys(activityGroup.activities).length : 0);
    }, 0)})</h4>
    <div className="activities-header-actions">
      <button onClick={(e) => { e.stopPropagation(); openModalHandler('create', { sightCode: sight.sightCode, sightName: sight.sightName, type: 'activity' });}} className="btn-small btn-secondary"> <Plus className="icon-small" /> Add Activity  </button>
      {expandedActivities[sight.id] ? (
        <ChevronUp className="chevron-icon" />
      ) : (
        <ChevronDown className="chevron-icon" />
      )}
    </div>
  </div>
  
  {expandedActivities[sight.id] && (
    <div className="activities-content">
      {relatedActivities.length > 0 ? (
        <div className="activities-grid compact">
          {relatedActivities.map((activityGroup: any) => {
            if (!activityGroup.activities || Object.keys(activityGroup.activities).length === 0) {
              return null;
            }
            return Object.entries(activityGroup.activities).map(([activityName, price]: [string, any]) => (
              <div key={`${activityGroup.id}-${activityName}`} className="activity-card compact">
                <div className="activity-content">
                  <div className="activity-info">
                    <h5 className="activity-name">{activityName}</h5>
                    <div className="activity-details"><span className="activity-price">{price}</span> </div>
                  </div>
                  <div className="activity-actions">
                    <button  onClick={() => openModalHandler('view', {  id: activityGroup.id, sightCode: activityGroup.sightCode, activityName: activityName, price: price, type: 'activity'  })}  className="action-btn-small view-btn"  title="View" > <Eye className="icon-small" /> </button>
                    <button onClick={() => openModalHandler('edit', {  id: activityGroup.id, sightCode: activityGroup.sightCode, activityName: activityName, price: price,type: 'activity'   })}  className="action-btn-small edit-btn"  title="Edit">  <Edit className="icon-small" /> </button>
                    <button onClick={() => handleDelete(activityGroup.id!, 'activity')} className="action-btn-small delete-btn" title="Delete" > <Trash2 className="icon-small" />  </button>
                  </div>
                </div>
              </div>
            ));
          }).filter(Boolean)}
        </div>
      ) : (
        <div className="no-activities-message"> No activities available for this sight. Click "Add Activity" to add one.</div>)}
    </div>
  )}
</div>

                  </div>
                );
              })
            )}
          </div>
        );

      case 'hotels':
        return (
          <div className="grid-layout">
            {isEmpty ? (
              <div className="empty-state full-width">
                {originalData.length === 0 ? 'No hotels found. Click "Add New" to create your first hotel.' : 'No hotels match your search.'}
              </div>
            ) : (
              filteredData.map((hotel: any) => (
                <div key={hotel.id} className="grid-card">
                  <div className="grid-card-content">
                    <div className="hotel-header">
                      <h3 className="grid-card-title">{hotel.hotel.hotelName}</h3>
                      <div className="star-rating">
                        {Array.from({ length: hotel.hotel.starRating }).map((_, i) => (<span key={i} className="star">★</span> ))}
                      </div>
                    </div>
                    <p className="grid-card-subtitle">
                      {hotel.hotel.location.city}, {hotel.hotel.location.country}
                    </p>
                    <div className="hotel-badges">
                      {hotel.hotel.isBestSeller && (<span className="badge best-seller">Best Seller</span>  )}
                      <span className={`badge ${hotel.hotel.availabilityStatus ? 'available' : 'unavailable'}`}>
                        {hotel.hotel.availabilityStatus ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                    <div className="grid-card-actions">
                      <button onClick={() => openModalHandler('view', hotel)} className="card-btn view-btn">View</button>
                      <button onClick={() => openModalHandler('edit', hotel)} className="card-btn edit-btn">Edit</button>
                      <button onClick={() => handleDelete(hotel.id!)} className="card-btn delete-btn">Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      default: return <div>Select a tab</div>;
    }
  };

  const renderModal = () => {
    if (!isModalOpen) return null;
    const getModalTitle = () => {
      const action = modalMode === 'create' ? 'Add New' : modalMode === 'edit' ? 'Edit' : 'View';
      let entity;
      if (selectedItem?.type === 'car' || (activeTab === 'sight-tours' && selectedItem?.carType)) { entity = 'Car Type';
      } else if (selectedItem?.type === 'activity' || (activeTab === 'sight-tours' && selectedItem?.activityName)) { entity = 'Activity';
      } else { entity = activeTab === 'packages' ? 'Package' :activeTab === 'sight-tours' ? 'Sight Tour' : 'Hotel'; }
      return `${action} ${entity}`;
    };

    const renderForm = () => {
      const onCancel = () => dispatch(closeModal());
      if (selectedItem?.type === 'car' || (activeTab === 'sight-tours' && selectedItem?.carType)) {
        return (
          <CarTypeForm carType={selectedItem?.type === 'car' ? selectedItem : selectedItem} mode={modalMode} onSave={modalMode === 'edit' ? (data) => handleUpdate(selectedItem.id, data) : handleCreate} onCancel={onCancel}/>
        );
      }
      if (selectedItem?.type === 'activity' || (activeTab === 'sight-tours' && selectedItem?.activityName)) {
        return (
          <ActivityForm activity={selectedItem?.type === 'activity' ? selectedItem : selectedItem} mode={modalMode} onSave={modalMode === 'edit' ? (data) => handleUpdate(selectedItem.id, data) : handleCreate} onCancel={onCancel} />
        );
      }
      
      switch (activeTab) {
        case 'packages':
          return (
            <PackageForm  package={selectedItem} mode={modalMode} onSave={modalMode === 'edit' ? (data) => handleUpdate(selectedItem.id, data) : handleCreate}onCancel={onCancel}  />
          );
        case 'sight-tours':
          return (
            <SightTourForm  sightTour={selectedItem}  mode={modalMode} onSave={modalMode === 'edit' ? (data) => handleUpdate(selectedItem.id, data) : handleCreate} onCancel={onCancel} />
          );
        case 'hotels':
          return (
            <HotelForm hotel={selectedItem} mode={modalMode} onSave={modalMode === 'edit' ? (data) => handleUpdate(selectedItem.id, data) : handleCreate} onCancel={onCancel}/>
          );
        default:
          return null;
      }
    };

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h2 className="modal-title">{getModalTitle()}</h2>
            <button onClick={() => dispatch(closeModal())} className="modal-close"><X className="icon" /> </button>
          </div>
          <div className="modal-content">
            {renderForm()}
          </div>
        </div>
      </div>
    );
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'packages': return <Package className="tab-icon" />;
      case 'sight-tours': return <MapPin className="tab-icon" />;
      case 'hotels': return <Hotel className="tab-icon" />;
      default: return null;
    }
  };
  
  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'packages': return 'Tour Packages';
      case 'sight-tours': return 'Sight Tours, Car Types & Activities';
      case 'hotels': return 'Hotels';
      default: return tab;
    }
  };

  const currentError = getCurrentError();
  const isLoading = getCurrentLoadingState();
  const handleSearchClick = () => {
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-container">
          <div className="header-content">
            <h1 className="dashboard-title">Tours Admin Dashboard</h1>
              <div className="header-actions">
                <div className="search-container" style={{ position: 'relative' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search className="search-icon"  onClick={handleSearchClick} style={{ cursor: 'pointer' }} />
                <input ref={searchInputRef} type="text" placeholder="Search cities, countries, packages..."  value={searchTerm} onChange={handleSearchInputChange} onKeyDown={handleKeyDown} onFocus={() => { const newSuggestions = generateSuggestions(searchTerm); setSuggestions(newSuggestions); setShowSuggestions(newSuggestions.length > 0); }} className="search-input" />
                </div>
                {showSuggestions && suggestions.length > 0 && (
                <div ref={suggestionsRef}className="search-suggestions" style={{ position: 'absolute',top: '100%',left: 0, right: 0,background: 'white', border: '1px solid #ddd', borderRadius: '4px',boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 1000,  maxHeight: '200px',overflowY: 'auto' }} > {suggestions.map((suggestion, index) => (
                <div key={index}className={`suggestion-item ${index === selectedSuggestionIndex ? 'selected' : ''}`} onClick={() => handleSuggestionClick(suggestion)} style={{ padding: '8px 12px',cursor: 'pointer', borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none', backgroundColor: index === selectedSuggestionIndex ? '#f5f5f5' : 'transparent'  }}> {suggestion}  </div> ))}
                </div> )}
              </div>
              <button onClick={() => openModalHandler('create')} className="btn btn-primary add-btn"> <Plus className="icon" /> <span>Add New</span> </button>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="tabs-container">
          <div className="tabs-nav">
            <nav className="tabs-list">{['packages', 'sight-tours', 'hotels'].map((tab) => ( <button key={tab} onClick={() => dispatch(setActiveTab(tab))} className={`tab-button ${activeTab === tab ? 'active' : ''}`} >{getTabIcon(tab)} <span>{getTabLabel(tab)}</span></button>))} </nav>
          </div>
        </div>
        <div className="main-content">
          <div className="content-container">
            {currentError && ( <div className="error-message"> Failed to load data. Please check your connection and try again. </div>)}
            {isLoading ? (
            <div className="loading-container"> <div className="loading-spinner"></div> </div>
            ) : ( renderTabContent() )}
          </div>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default AdminDashboard;
