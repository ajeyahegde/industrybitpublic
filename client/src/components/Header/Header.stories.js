import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Header from './index.js'

storiesOf('limis/components/Header', module).add('Default', () => <Header />)
