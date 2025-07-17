import { render } from '@testing-library/react'
import { LoadingModal } from '../../components'
import { describe, expect, it, test } from 'vitest'

describe('LoadingModal Component', () => {
  it('should render without errors', () => {
    render(<LoadingModal />)
    const modalElement = screen.getByRole('presentation')
    expect(modalElement).toBeInTheDocument()
  })
  it('should contain the loading logo image', () => {
    render(<LoadingModal />)
    const logoElement = screen.getByRole('img', { name: /logo-loading/i })
    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveAttribute('src', expect.stringContaining('LoadingLogo.svg'))
  })
  it('should have correct CSS classes', () => {
    render(<LoadingModal />)
    const modalElement = screen.getByRole('presentation')
    expect(modalElement).toHaveClass('loading-modal')

    const logoContainer = screen.getByTestId('logo-container')
    expect(logoContainer).toHaveClass('loading-modal-logo')

    const imageElement = screen.getByRole('img')
    expect(imageElement).toHaveClass('rotation-zoom')
  })
})