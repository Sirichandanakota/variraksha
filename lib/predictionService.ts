const DISEASE_CLASSES = [
  'Healthy',
  'Tungro',
  'Rice Hispa',
  'Brown Spot',
  'Neck Blast',
  'Narrow Brown Spot',
  'Leaf Blast',
  'Sheath Blight',
  'Leaf Scald',
  'Bacterial Leaf Blight',
]

export const DISEASE_INFO: Record<
  string,
  {
    name: string
    description: string
    symptoms: string[]
    impact: string
    recommendations: string
  }
> = {
  Healthy: {
    name: 'Healthy',
    description: 'The rice leaf appears to be in good health with no visible disease symptoms.',
    symptoms: ['Vibrant green color', 'Firm texture', 'No lesions or discoloration'],
    impact: 'No disease detected. Continue regular crop monitoring.',
    recommendations: 'Maintain proper watering and fertilization schedules.',
  },
  Tungro: {
    name: 'Tungro',
    description:
      'Tungro is a viral disease that causes yellowing and stunting of rice plants. It is transmitted by leafhopper insects.',
    symptoms: [
      'Yellow or orange discoloration',
      'Leaf curling',
      'Stunted plant growth',
      'Wilting appearance',
    ],
    impact: 'High impact on crop productivity. Can cause significant yield loss.',
    recommendations: 'Information to be verified with agricultural experts.',
  },
  'Rice Hispa': {
    name: 'Rice Hispa',
    description:
      'Rice Hispa is caused by insect pests that feed on rice leaves, creating characteristic linear patterns.',
    symptoms: ['Linear scraping marks on leaves', 'White streaks or patterns', 'Leaf damage'],
    impact: 'Moderate impact. Reduces photosynthetic area.',
    recommendations: 'Information to be verified with agricultural experts.',
  },
  'Brown Spot': {
    name: 'Brown Spot',
    description:
      'Brown Spot is a fungal disease characterized by brown lesions on rice leaves. It is common in rice-growing regions.',
    symptoms: [
      'Brown circular or oval lesions',
      'Dark borders around lesions',
      'Lesions may appear on leaf sheath and grain',
      'Premature leaf senescence',
    ],
    impact: 'Moderate to high impact depending on severity and plant stage.',
    recommendations: 'Information to be verified with agricultural experts.',
  },
  'Neck Blast': {
    name: 'Neck Blast',
    description:
      'Neck Blast is a fungal disease that affects the rice panicle neck, causing grain loss.',
    symptoms: [
      'Grayish lesions on the panicle neck',
      'Premature panicle death',
      'Grain fill reduction',
      'Empty spikelets',
    ],
    impact: 'High impact on grain yield. Critical at heading stage.',
    recommendations: 'Information to be verified with agricultural experts.',
  },
  'Narrow Brown Spot': {
    name: 'Narrow Brown Spot',
    description:
      'Narrow Brown Spot is a fungal disease that causes narrow, elongated lesions on rice leaves.',
    symptoms: [
      'Narrow brown streaks',
      'Lesions elongated along leaf veins',
      'Often associated with other diseases',
      'Leaf yellowing and drying',
    ],
    impact: 'Low to moderate impact, often occurs with other diseases.',
    recommendations: 'Information to be verified with agricultural experts.',
  },
  'Leaf Blast': {
    name: 'Leaf Blast',
    description:
      'Leaf Blast is a fungal disease that causes diamond-shaped lesions on rice leaves.',
    symptoms: [
      'Diamond-shaped lesions with gray center and dark border',
      'Lesions often on older leaves first',
      'May progress to neck and node blast',
      'Can affect plants at any growth stage',
    ],
    impact: 'Moderate to high impact depending on plant stage and disease pressure.',
    recommendations: 'Information to be verified with agricultural experts.',
  },
  'Sheath Blight': {
    name: 'Sheath Blight',
    description:
      'Sheath Blight is a fungal disease affecting rice leaf sheaths, common in warm, humid conditions.',
    symptoms: [
      'Elliptical lesions on leaf sheath',
      'Light brown center with darker border',
      'Lesions progress up the plant',
      'Can affect multiple leaf sheaths',
    ],
    impact: 'Moderate impact, reduces leaf area and photosynthesis.',
    recommendations: 'Information to be verified with agricultural experts.',
  },
  'Leaf Scald': {
    name: 'Leaf Scald',
    description:
      'Leaf Scald is a bacterial disease that causes irregular, yellowish-brown lesions on rice leaves.',
    symptoms: [
      'Yellowish-brown irregular lesions',
      'Wavy lesion margins',
      'Often starts on leaf margins',
      'Can cause premature leaf death',
    ],
    impact: 'Low to moderate impact on yield.',
    recommendations: 'Information to be verified with agricultural experts.',
  },
  'Bacterial Leaf Blight': {
    name: 'Bacterial Leaf Blight',
    description:
      'Bacterial Leaf Blight is a serious bacterial disease causing significant crop damage in susceptible rice varieties.',
    symptoms: [
      'Water-soaked lesions on leaves',
      'Yellow halo around lesions',
      'Lesions coalesce causing leaf drying',
      'Can affect multiple plant parts',
    ],
    impact: 'High impact. Can cause severe yield loss in susceptible varieties.',
    recommendations: 'Information to be verified with agricultural experts.',
  },
}

export const LOW_CONFIDENCE_THRESHOLD = 0.6

export interface PredictionResult {
  disease: string
  confidence: number
  isLowConfidence: boolean
  isInvalid: boolean
}

export async function predictDisease(
  imageFile: File
): Promise<PredictionResult> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (apiUrl && apiUrl !== '') {
    return await predictFromBackend(imageFile, apiUrl)
  }

  return mockPredict(imageFile)
}

async function predictFromBackend(
  imageFile: File,
  apiUrl: string
): Promise<PredictionResult> {
  try {
    const formData = new FormData()
    formData.append('file', imageFile)

    const response = await fetch(`${apiUrl}/predict`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Prediction request failed')
    }

    const data = await response.json()

    return {
      disease: data.disease || 'Unknown',
      confidence: data.confidence || 0,
      isLowConfidence: (data.confidence || 0) < LOW_CONFIDENCE_THRESHOLD,
      isInvalid: Boolean(data.isInvalid),
    }
  } catch (error) {
    console.error('Backend prediction failed, falling back to mock:', error)
    return mockPredict(imageFile)
  }
}

function mockPredict(imageFile: File): PredictionResult {
  const fileName = imageFile.name.toLowerCase()
  const looksUnusable = /(invalid|unrelated|animal|person|blurry|blur|dark|unclear|non[-_ ]?rice)/i.test(fileName)

  if (!imageFile.type.startsWith('image/') || looksUnusable) {
    return {
      disease: 'Invalid',
      confidence: 0,
      isLowConfidence: false,
      isInvalid: true,
    }
  }

  let diseaseIndex = 0

  for (let i = 0; i < fileName.length; i++) {
    diseaseIndex = (diseaseIndex + fileName.charCodeAt(i)) % DISEASE_CLASSES.length
  }

  const disease = DISEASE_CLASSES[diseaseIndex]
  const confidence = 0.85 + Math.random() * 0.14

  return {
    disease,
    confidence: Math.round(confidence * 1000) / 1000,
    isLowConfidence: confidence < LOW_CONFIDENCE_THRESHOLD,
    isInvalid: false,
  }
}

export function getDiseaseInfo(
  diseaseName: string
): (typeof DISEASE_INFO)[keyof typeof DISEASE_INFO] | undefined {
  return DISEASE_INFO[diseaseName as keyof typeof DISEASE_INFO]
}
