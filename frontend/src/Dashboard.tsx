import React, { useState, useEffect } from 'react';
import {
  FaUserInjured,
  FaCalendarCheck,
  FaUserDoctor,
  FaFileMedical,
  FaPlus,
  FaMagnifyingGlass,
  FaPenToSquare,
  FaTrash,
  FaUsers,
  FaStethoscope,
  FaNotesMedical,
} from 'react-icons/fa6';
import {
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaCog,
} from 'react-icons/fa';

// Define interfaces for our data types
interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  phone: string;
  email: string;
  disease: string;
}

interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  time: string;
  status: string;
  notes: string;
  patient_name?: string;
  doctor_name?: string;
}

interface MedicalRecord {
  id: number;
  patient_id: number;
  doctor_id: number;
  date: string;
  description: string;
  prescriptions: string;
  lab_results: string;
}

interface DoctorProfile {
  id: number;
  user_id: number;
  specialization: string;
  bio: string;
  availability: string;
}

function Dashboard() {
  const userRole = 'admin'; // Changed from localStorage for artifact compatibility
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState(true); // Changed to true initially
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');

  // Form states
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [showRecordForm, setShowRecordForm] = useState(false);

  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id'>>({
    name: '',
    age: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    disease: ''
  });

  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    patient_id: '',
    doctor_id: '',
    time: '',
    status: 'scheduled',
    notes: ''
  });

  const [newRecord, setNewRecord] = useState<Omit<MedicalRecord, 'id'>>({
    patient_id: '',
    doctor_id: '',
    date: '',
    description: '',
    prescriptions: '',
    lab_results: ''
  });

  // Mock data for demonstration
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set mock data
        setPatients([
          { id: 1, name: 'John Doe', age: 35, gender: 'Male', address: '123 Main St', phone: '555-0123', email: 'john@email.com', disease: 'Hypertension' },
          { id: 2, name: 'Jane Smith', age: 28, gender: 'Female', address: '456 Oak Ave', phone: '555-0456', email: 'jane@email.com', disease: 'Diabetes' },
          { id: 3, name: 'Bob Johnson', age: 42, gender: 'Male', address: '789 Pine St', phone: '555-0789', email: 'bob@email.com', disease: 'Asthma' }
        ]);

        setAppointments([
          { id: 1, patient_id: 1, doctor_id: 1, time: '2024-12-15T10:00:00', status: 'scheduled', notes: 'Regular checkup', patient_name: 'John Doe', doctor_name: 'Dr. Smith' },
          { id: 2, patient_id: 2, doctor_id: 2, time: '2024-12-16T14:30:00', status: 'completed', notes: 'Follow-up visit', patient_name: 'Jane Smith', doctor_name: 'Dr. Johnson' },
          { id: 3, patient_id: 3, doctor_id: 1, time: '2024-12-17T09:15:00', status: 'cancelled', notes: 'Patient rescheduled', patient_name: 'Bob Johnson', doctor_name: 'Dr. Smith' }
        ]);

        setDoctors([
          { id: 1, user_id: 1, specialization: 'Cardiology', bio: 'Experienced cardiologist with 15 years of practice', availability: 'Mon-Fri 9AM-5PM' },
          { id: 2, user_id: 2, specialization: 'Endocrinology', bio: 'Specialist in diabetes and hormonal disorders', availability: 'Tue-Sat 10AM-6PM' },
          { id: 3, user_id: 3, specialization: 'Pulmonology', bio: 'Expert in respiratory system disorders', availability: 'Mon-Wed-Fri 8AM-4PM' }
        ]);

        setMedicalRecords([
          { id: 1, patient_id: 1, doctor_id: 1, date: '2024-12-01', description: 'Blood pressure check', prescriptions: 'Lisinopril 10mg daily', lab_results: 'BP: 140/90' },
          { id: 2, patient_id: 2, doctor_id: 2, date: '2024-12-02', description: 'Diabetes management', prescriptions: 'Metformin 500mg twice daily', lab_results: 'HbA1c: 7.2%' }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: FaTachometerAlt },
    { id: 'patients', label: 'Patients', icon: FaUserInjured },
    { id: 'appointments', label: 'Appointments', icon: FaCalendarCheck },
    { id: 'doctors', label: 'Doctors', icon: FaUserDoctor },
    { id: 'records', label: 'Medical Records', icon: FaFileMedical }
  ];

  const handleSubmit = async (endpoint: string, data: any, setter: React.Dispatch<React.SetStateAction<any[]>>, resetForm: () => void) => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate a new ID (in a real app, this would come from the backend)
      const newId = Math.max(...patients.map(p => p.id), 0) + 1;
      const newItem = { ...data, id: newId };
      
      // Update state
      setter(prev => [...prev, newItem]);
      
      // Reset form and close modal
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase());

    if (timeFilter === 'all') return matchesSearch;

    const appointmentTime = new Date(appointment.time);
    const now = new Date();

    switch (timeFilter) {
      case 'today':
        return matchesSearch && appointmentTime.toDateString() === now.toDateString();
      case 'upcoming':
        return matchesSearch && appointmentTime > now;
      case 'past':
        return matchesSearch && appointmentTime < now;
      default:
        return matchesSearch;
    }
  });

  const resetPatientForm = () => {
    setNewPatient({
      name: '', age: '', gender: '', address: '', phone: '', email: '', disease: ''
    });
    setShowPatientForm(false);
  };

  const resetAppointmentForm = () => {
    setNewAppointment({
      patient_id: '', doctor_id: '', time: '', status: 'scheduled', notes: ''
    });
    setShowAppointmentForm(false);
  };

  const resetRecordForm = () => {
    setNewRecord({
      patient_id: '', doctor_id: '', date: '', description: '', prescriptions: '', lab_results: ''
    });
    setShowRecordForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const Sidebar = () => (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:z-auto ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FaStethoscope className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Monash Health</h2>
                  <p className="text-sm text-gray-500">Portal</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {userRole.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900 capitalize">{userRole}</p>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`text-lg ${
                        activeTab === item.id ? 'text-blue-700' : 'text-gray-400'
                      }`} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                <FaCog className="text-gray-400" />
                <span>Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                <FaSignOutAlt className="text-red-500" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Patients</p>
              <p className="text-3xl font-bold">{patients.length}</p>
            </div>
            <FaUsers className="text-4xl text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Appointments</p>
              <p className="text-3xl font-bold">{appointments.length}</p>
            </div>
            <FaCalendarCheck className="text-4xl text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Doctors</p>
              <p className="text-3xl font-bold">{doctors.length}</p>
            </div>
            <FaStethoscope className="text-4xl text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Medical Records</p>
              <p className="text-3xl font-bold">{medicalRecords.length}</p>
            </div>
            <FaNotesMedical className="text-4xl text-orange-200" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('patients')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <div className="text-center">
              <FaUserInjured className="text-3xl text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-700">Manage Patients</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <div className="text-center">
              <FaCalendarCheck className="text-3xl text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-700">Book Appointment</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <div className="text-center">
              <FaUserDoctor className="text-3xl text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-700">View Doctors</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('records')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <div className="text-center">
              <FaFileMedical className="text-3xl text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-gray-700">Medical Records</p>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
        <div className="space-y-3">
          {appointments.slice(0, 5).map(appointment => (
            <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">
                    {appointment.patient_name || `Patient #${appointment.patient_id}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(appointment.time).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        {(userRole === 'receptionist' || userRole === 'admin') && (
          <button
            onClick={() => setShowPatientForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> Add Patient
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map(patient => (
            <div key={patient.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  patient.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                }`}>
                  {patient.gender}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Age:</span> {patient.age} years</p>
                <p><span className="font-medium">Phone:</span> {patient.phone}</p>
                <p><span className="font-medium">Email:</span> {patient.email}</p>
                <p><span className="font-medium">Disease:</span> {patient.disease}</p>
                <p><span className="font-medium">Address:</span> {patient.address}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => {
                    // In a real app, we would set up edit state here
                    console.log('Edit patient:', patient.id);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <FaPenToSquare />
                </button>
                <button 
                  onClick={() => {
                    // In a real app, we would confirm and then delete
                    console.log('Delete patient:', patient.id);
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Form Modal */}
      {showPatientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add New Patient</h3>
                <button onClick={resetPatientForm} className="text-gray-400 hover:text-gray-600">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit('/patients', {
                  ...newPatient,
                  age: parseInt(newPatient.age as string)
                }, setPatients, resetPatientForm);
              }}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                    min="0"
                    max="120"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <select
                    value={newPatient.gender}
                    onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Disease/Condition"
                    value={newPatient.disease}
                    onChange={(e) => setNewPatient({...newPatient, disease: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Address"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    required
                  />
                  <div className="flex gap-3">
                    <button 
                      type="submit" 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1"
                      disabled={loading}
                    >
                      {loading ? 'Adding...' : 'Add Patient'}
                    </button>
                    <button 
                      type="button" 
                      onClick={resetPatientForm} 
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex-1"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointment Management</h2>
          <p className="text-gray-600">Schedule and manage patient appointments</p>
        </div>
        <button
          onClick={() => setShowAppointmentForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <FaPlus /> Book Appointment
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="sm:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Appointments</option>
            <option value="today">Today</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map(appointment => (
              <div key={appointment.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Appointment #{appointment.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                      <p><span className="font-medium">Patient:</span> {appointment.patient_name || `ID: ${appointment.patient_id}`}</p>
                      <p><span className="font-medium">Doctor:</span> {appointment.doctor_name || `ID: ${appointment.doctor_id}`}</p>
                      <p><span className="font-medium">Date:</span> {new Date(appointment.time).toLocaleDateString()}</p>
                      <p><span className="font-medium">Time:</span> {new Date(appointment.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    {appointment.notes && (
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Notes:</span> {appointment.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => {
                        // In a real app, we would set up edit state here
                        console.log('Edit appointment:', appointment.id);
                      }}
                    >
                      <FaPenToSquare />
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => {
                        // In a real app, we would confirm and then delete
                        console.log('Delete appointment:', appointment.id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No appointments found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Form Modal */}
      {showAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Book New Appointment</h3>
                <button onClick={resetAppointmentForm} className="text-gray-400 hover:text-gray-600">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit('/appointments', {
                  ...newAppointment,
                  patient_id: parseInt(newAppointment.patient_id as string),
                  doctor_id: parseInt(newAppointment.doctor_id as string)
                }, setAppointments, resetAppointmentForm);
              }}>
                <div className="space-y-4">
                  <select
                    value={newAppointment.patient_id}
                    onChange={(e) => setNewAppointment({...newAppointment, patient_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>{patient.name}</option>
                    ))}
                  </select>
                  <select
                    value={newAppointment.doctor_id}
                    onChange={(e) => setNewAppointment({...newAppointment, doctor_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>{doctor.specialization}</option>
                    ))}
                  </select>
                  <input
                    type="datetime-local"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <select
                    value={newAppointment.status}
                    onChange={(e) => setNewAppointment({...newAppointment, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <textarea
                    placeholder="Notes"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex gap-3">
                    <button 
                      type="submit" 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1"
                      disabled={loading}
                    >
                      {loading ? 'Booking...' : 'Book Appointment'}
                    </button>
                    <button 
                      type="button" 
                      onClick={resetAppointmentForm} 
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex-1"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDoctors = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Doctor Profiles</h2>
        <p className="text-gray-600">View doctor specializations and availability</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <div key={doctor.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaUserDoctor className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Dr. {doctor.specialization}</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <p className="font-medium text-gray-900">Specialization</p>
                  <p>{doctor.specialization}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Bio</p>
                  <p>{doctor.bio}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Availability</p>
                  <p>{doctor.availability}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button 
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => {
                    // In a real app, we would set up edit state here
                    console.log('Edit doctor:', doctor.id);
                  }}
                >
                  <FaPenToSquare />
                </button>
                <button 
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  onClick={() => {
                    // In a real app, we would confirm and then delete
                    console.log('Delete doctor:', doctor.id);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecords = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
          <p className="text-gray-600">Manage patient medical records and history</p>
        </div>
        {userRole === 'doctor' && (
          <button
            onClick={() => setShowRecordForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> Add Record
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="space-y-4">
          {medicalRecords.length > 0 ? (
            medicalRecords.map(record => (
              <div key={record.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Record #{record.id}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p><span className="font-medium">Patient ID:</span> {record.patient_id}</p>
                    <p><span className="font-medium">Doctor ID:</span> {record.doctor_id}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Description:</span></p>
                    <p className="mt-1">{record.description}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Prescriptions:</span></p>
                    <p className="mt-1">{record.prescriptions || 'None'}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Lab Results:</span></p>
                    <p className="mt-1">{record.lab_results || 'None'}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button 
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => {
                      // In a real app, we would set up edit state here
                      console.log('Edit record:', record.id);
                    }}
                  >
                    <FaPenToSquare />
                  </button>
                  <button 
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => {
                      // In a real app, we would confirm and then delete
                      console.log('Delete record:', record.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No medical records found</p>
            </div>
          )}
        </div>
      </div>

      {/* Record Form Modal */}
      {showRecordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Medical Record</h3>
                <button onClick={resetRecordForm} className="text-gray-400 hover:text-gray-600">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit('/medical-records', {
                  ...newRecord,
                  patient_id: parseInt(newRecord.patient_id as string),
                  doctor_id: parseInt(newRecord.doctor_id as string)
                }, setMedicalRecords, resetRecordForm);
              }}>
                <div className="space-y-4">
                  <select
                    value={newRecord.patient_id}
                    onChange={(e) => setNewRecord({...newRecord, patient_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Patient</option>
                    {patients.map(patient => (
                      <option key={patient.id} value={patient.id}>{patient.name}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <textarea
                    placeholder="Description"
                    value={newRecord.description}
                    onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    required
                  />
                  <textarea
                    placeholder="Prescriptions"
                    value={newRecord.prescriptions}
                    onChange={(e) => setNewRecord({...newRecord, prescriptions: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <textarea
                    placeholder="Lab Results"
                    value={newRecord.lab_results}
                    onChange={(e) => setNewRecord({...newRecord, lab_results: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex gap-3">
                    <button 
                      type="submit" 
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1"
                      disabled={loading}
                    >
                      {loading ? 'Adding...' : 'Add Record'}
                    </button>
                    <button 
                      type="button" 
                      onClick={resetRecordForm} 
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex-1"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64"> {/* Adjusted margin to match sidebar width */}
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <FaBars className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h1>
                <p className="text-sm text-gray-500">
                  Welcome back, {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <span className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading...</span>
            </div>
          )}

          {!loading && (
            <>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'patients' && renderPatients()}
              {activeTab === 'appointments' && renderAppointments()}
              {activeTab === 'doctors' && renderDoctors()}
              {activeTab === 'records' && renderRecords()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;