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
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', paddingTop: '6rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#d4af37', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold', transition: 'opacity 0.3s' }}>
            ← Volver al inicio
          </Link>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '2.5rem', border: '2px solid #d4af37' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#d4af37', textAlign: 'center', fontWeight: 'bold' }}>
            Reserva tu Cita
          </h2>

          {bookingSuccess && (
            <div style={{ background: 'linear-gradient(135deg, #d4af37 0%, #b8941f 100%)', color: '#000', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>
              ¡Reserva confirmada! Recibirás un correo de confirmación.
            </div>
          )}

          {error && (
            <div style={{ background: '#ff6b35', color: '#fff', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontWeight: 'bold' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#d4af37', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
              1. Selecciona el Servicio
            </h3>
            <select
              style={{ 
                width: '100%', 
                padding: '1rem', 
                fontSize: '1rem', 
                backgroundColor: '#0a0a0a', 
                color: '#fff', 
                border: '2px solid #d4af37', 
                borderRadius: '8px',
                cursor: 'pointer',
                outline: 'none'
              }}
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value)
                setAvailableSlots([])
                setSelectedSlot('')
                setError('')
              }}
              disabled={loading}
            >
              <option value="" style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>-- Selecciona un servicio --</option>
              {businessConfig.services.map((service) => (
                <option key={service.name} value={service.name} style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>
                  {service.name} ({service.duration} min)
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#d4af37', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
              2. Selecciona la Fecha
            </h3>
            <input
              type="date"
              style={{ 
                width: '100%', 
                padding: '1rem', 
                fontSize: '1rem', 
                backgroundColor: '#0a0a0a', 
                color: '#fff', 
                border: '2px solid #d4af37', 
                borderRadius: '8px',
                outline: 'none',
                colorScheme: 'dark'
              }}
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
            style={{ 
              width: '100%', 
              padding: '1rem', 
              fontSize: '1rem', 
              fontWeight: 'bold', 
              backgroundColor: loading || !selectedService || !selectedDate ? '#666' : '#d4af37', 
              color: '#000', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: loading || !selectedService || !selectedDate ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '2rem'
            }}
            onClick={handleCheckAvailability}
            disabled={loading || !selectedService || !selectedDate}
          >
            {loading ? 'Consultando...' : 'Consultar Disponibilidad'}
          </button>

          {availableSlots.length > 0 && (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#d4af37', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                  3. Selecciona un Horario
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.75rem' }}>
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      style={{ 
                        padding: '0.75rem', 
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        backgroundColor: selectedSlot === slot ? '#d4af37' : '#0a0a0a', 
                        color: selectedSlot === slot ? '#000' : '#fff', 
                        border: `2px solid ${selectedSlot === slot ? '#d4af37' : '#666'}`, 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => setSelectedSlot(slot)}
                      disabled={loading}
                      onMouseEnter={(e) => {
                        if (selectedSlot !== slot) {
                          e.currentTarget.style.borderColor = '#d4af37'
                          e.currentTarget.style.backgroundColor = '#1a1a1a'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSlot !== slot) {
                          e.currentTarget.style.borderColor = '#666'
                          e.currentTarget.style.backgroundColor = '#0a0a0a'
                        }
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {selectedSlot && (
                <div>
                  <h3 style={{ color: '#d4af37', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                    4. Completa tus Datos
                  </h3>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#d4af37', fontWeight: '600' }}>
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      style={{ 
                        width: '100%', 
                        padding: '1rem', 
                        fontSize: '1rem', 
                        backgroundColor: '#0a0a0a', 
                        color: '#fff', 
                        border: '2px solid #d4af37', 
                        borderRadius: '8px',
                        outline: 'none'
                      }}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Tu nombre"
                      disabled={loading}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#d4af37', fontWeight: '600' }}>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      style={{ 
                        width: '100%', 
                        padding: '1rem', 
                        fontSize: '1rem', 
                        backgroundColor: '#0a0a0a', 
                        color: '#fff', 
                        border: '2px solid #d4af37', 
                        borderRadius: '8px',
                        outline: 'none'
                      }}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+56 9 1234 5678"
                      disabled={loading}
                    />
                  </div>

                  <div style={{ backgroundColor: '#0a0a0a', border: '2px solid #d4af37', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#d4af37', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                      Resumen de tu Reserva
                    </h4>
                    <p style={{ color: '#fff', marginBottom: '0.5rem', lineHeight: '1.8' }}>
                      <strong style={{ color: '#d4af37' }}>Servicio:</strong> {selectedService}
                    </p>
                    <p style={{ color: '#fff', marginBottom: '0.5rem', lineHeight: '1.8' }}>
                      <strong style={{ color: '#d4af37' }}>Fecha:</strong> {formatDateForDisplay(selectedDate)}
                    </p>
                    <p style={{ color: '#fff', marginBottom: '0', lineHeight: '1.8' }}>
                      <strong style={{ color: '#d4af37' }}>Hora:</strong> {selectedSlot}
                    </p>
                  </div>

                  <button
                    style={{ 
                      width: '100%', 
                      padding: '1.25rem', 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold', 
                      background: loading || !customerName.trim() || !customerPhone.trim() 
                        ? '#666' 
                        : 'linear-gradient(135deg, #d4af37 0%, #ff8c42 100%)', 
                      color: '#000', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: loading || !customerName.trim() || !customerPhone.trim() ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                    }}
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
    </div>
  )
}
