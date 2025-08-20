import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material'
import {
  Help,
  ExpandMore,
  ExpandLess,
  Create,
  Assignment,
  Visibility,
  Save,
  Mouse,
  Timer,
} from '@mui/icons-material'
import { useHelpGuide } from '../../hooks/components/interactiveEditor/useHelpGuide'

interface HelpGuideProps {
  isVisible?: boolean
  onToggle?: () => void
}

/**
 * Help Guide Component
 * Provides step-by-step instructions for using the Interactive Editor
 */
const HelpGuide: React.FC<HelpGuideProps> = ({
  isVisible = false,
  onToggle,
}) => {
  const {
    isExpanded,
    handleToggle,
    helpSteps,
    proTips,
    title,
    subtitle,
    proTipsTitle,
  } = useHelpGuide({
    isVisible,
    onToggle,
  })

  // Map icon names to actual icons
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      Create: <Create />,
      Mouse: <Mouse />,
      Timer: <Timer />,
      Assignment: <Assignment />,
      Visibility: <Visibility />,
      Save: <Save />,
    }
    return iconMap[iconName] || <Help />
  }

  return (
    <Card sx={{ mb: 3, border: '1px solid #e3f2fd' }}>
      <CardContent sx={{ pb: isExpanded ? 2 : 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Help color='primary' />
            <Typography variant='h6' color='primary'>
              {title}
            </Typography>
            <Chip
              label='Guide'
              size='small'
              color='primary'
              variant='outlined'
            />
          </Box>

          <IconButton onClick={handleToggle} size='small'>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={isExpanded}>
          <Box sx={{ mt: 2 }}>
            <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
              {subtitle}
            </Typography>

            <List dense>
              {helpSteps.map((step, index) => (
                <ListItem key={index} sx={{ alignItems: 'flex-start', mb: 1 }}>
                  <ListItemIcon sx={{ mt: 0.5 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {index + 1}
                    </Box>
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        {getIcon(step.iconName)}
                        <Typography variant='subtitle2' fontWeight='bold'>
                          {step.title}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant='body2' sx={{ mb: 1 }}>
                          {step.description}
                        </Typography>
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                          {step.tips.map((tip, tipIndex) => (
                            <Chip
                              key={tipIndex}
                              label={tip}
                              size='small'
                              variant='outlined'
                              color='secondary'
                              sx={{ fontSize: '0.75rem' }}
                            />
                          ))}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Box
              sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}
            >
              <Typography variant='subtitle2' fontWeight='bold' sx={{ mb: 1 }}>
                {proTipsTitle}
              </Typography>
              <Typography variant='body2' component='ul' sx={{ m: 0, pl: 2 }}>
                {proTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}

export default HelpGuide
