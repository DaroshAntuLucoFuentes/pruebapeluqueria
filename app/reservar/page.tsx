'use client'

import { useState } from 'react'
import businessConfig from '@/config/business.json'
import Link from 'next/link'

export default function ReservarPage() {
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const handleCheckAvailability = async () => {
    if (!selectedService || !selectedDate) {
      setError('Por favor selecciona un servicio y una fecha')
      return
    }

    setLoading(true)
    setError('')
    setAvailableSlots([])
    setSelectedSlot('')

    try {
      const response = await fetch(
        `/api/availability?date=${selectedDate}&service=${encodeURIComponent(selectedService)}`
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al consultar disponibilidad')
      }

      const data = await response.json()
      setAvailableSlots(data.availableSlots)

      if (data.availableSlots.length === 0) {
        setError('No hay horarios disponibles para esta fecha')
      }
    } catch (err: any) {
      setError(err.message || 'Error al consultar disponibilidad')
    } finally {
      setLoading(false)
    }
  }

  const handleBookAppointment = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      setError('Por favor completa tu nombre y teléfono')
      return
    }

    if (!selectedSlot) {
      setError('Por favor selecciona un horario')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: selectedService,
          date: selectedDate,
          time: selectedSlot,
          customerName,
          customerPhone,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al crear la reserva')
      }

      setBookingSuccess(true)
      setSelectedService('')
      setSelectedDate('')
      setAvailableSlots([])
      setSelectedSlot('')
      setCustomerName('')
      setCustomerPhone('')

      setTimeout(() => setBookingSuccess(false), 5000)
    } catch (err: any) {
      setError(err.message || 'Error al crear la reserva')
    } finally {
      setLoading(false)
    }
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const today = new Date()
    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth() + 1)
    return maxDate.toISOString().split('T')[0]
  }

  const formatDateForDisplay = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="container">
      <div className="booking-container">
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#3498db', textDecoration: 'underline' }}>
            ← Volver al inicio
          </Link>
        </div>

        <h2 className="title">Reserva tu Cita</h2>

        {bookingSuccess && (
          <div className="success-message">
            ¡Reserva confirmada! Recibirás un correo de confirmación.
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-section">
          <h3 className="section-title">1. Selecciona el Servicio</h3>
          <select
            className="input"
            value={selectedService}
            onChange={(e) => {
              setSelectedService(e.target.value)
              setAvailableSlots([])
              setSelectedSlot('')
              setError('')
            }}
            disabled={loading}
          >
            <option value="">-- Selecciona un servicio --</option>
            {businessConfig.services.map((service) => (
              <option key={service.name} value={service.name}>
                {service.name} ({service.duration} min)
              </option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <h3 className="section-title">2. Selecciona la Fecha</h3>
          <input
            type="date"
            className="input"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value)
              setAvailableSlots([])
              setSelectedSlot('')
              setError('')
            }}
            min={getTodayDate()}
            max={getMaxDate()}
            disabled={loading}
          />
        </div>

        <button
          className="button button-primary"
          onClick={handleCheckAvailability}
          disabled={loading || !selectedService || !selectedDate}
        >
          {loading ? 'Consultando...' : 'Consultar Disponibilidad'}
        </button>

        {availableSlots.length > 0 && (
          <>
            <div className="form-section">
              <h3 className="section-title">3. Selecciona un Horario</h3>
              <div className="slots-grid">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    className={`slot-button ${selectedSlot === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                    disabled={loading}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {selectedSlot && (
              <div className="form-section">
                <h3 className="section-title">4. Completa tus Datos</h3>
                <div className="form-group">
                  <label className="label">Nombre completo</label>
                  <input
                    type="text"
                    className="input"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Tu nombre"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Teléfono</label>
                  <input
                    type="tel"
                    className="input"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+56 9 1234 5678"
                    disabled={loading}
                  />
                </div>

                <div className="booking-summary">
                  <h4>Resumen de tu Reserva</h4>
                  <p><strong>Servicio:</strong> {selectedService}</p>
                  <p><strong>Fecha:</strong> {formatDateForDisplay(selectedDate)}</p>
                  <p><strong>Hora:</strong> {selectedSlot}</p>
                </div>

                <button
                  className="button button-success"
                  onClick={handleBookAppointment}
                  disabled={loading || !customerName.trim() || !customerPhone.trim()}
                >
                  {loading ? 'Confirmando...' : 'Confirmar Reserva'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
