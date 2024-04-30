import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('when the app is rendered', () => {
    test('should display the header', () => {
        render(<App />)
        expect(screen.getByText('Format me')).toBeDefined()
    })
})
