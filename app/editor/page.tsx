'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Download, 
  Save, 
  Undo, 
  Redo, 
  Settings, 
  Share2,
  Crop,
  RotateCw,
  Palette,
  Type,
  Layers,
  Video,
  Music,
  Sparkles,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Copy,
  Move,
  Square,
  Circle,
  Minus,
  Plus,
  Maximize,
  Minimize,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Scissors,
  Clock,
  Target,
  Wand2,
  Zap,
  Camera,
  Film,
  Image as ImageIcon,
  FileText,
  Grid,
  List,
  Search,
  Filter,
  Star,
  Heart,
  Download as DownloadIcon,
  Share,
  MoreHorizontal,
  X,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  User,
  LogOut,
  Bell,
  Mail,
  Calendar,
  Folder,
  HardDrive,
  Cloud,
  Wifi,
  WifiOff,
  RefreshCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  ZoomIn,
  ZoomOut,
  Move as MoveIcon,
  Hand,
  MousePointer,
  PenTool,
  Brush,
  Eraser,
  Droplets,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  Tv,
  MonitorPlay,
  SmartphonePlay,
  TabletPlay,
  TvPlay,
  MonitorPause,
  SmartphonePause,
  TabletPause,
  TvPause,
  MonitorStop,
  SmartphoneStop,
  TabletStop,
  TvStop,
  MonitorSkipBack,
  SmartphoneSkipBack,
  TabletSkipBack,
  TvSkipBack,
  MonitorSkipForward,
  SmartphoneSkipForward,
  TabletSkipForward,
  TvSkipForward,
  MonitorRewind,
  SmartphoneRewind,
  TabletRewind,
  TvRewind,
  MonitorFastForward,
  SmartphoneFastForward,
  TabletFastForward,
  TvFastForward,
  MonitorVolume,
  SmartphoneVolume,
  TabletVolume,
  TvVolume,
  MonitorVolume2,
  SmartphoneVolume2,
  TabletVolume2,
  TvVolume2,
  MonitorVolumeX,
  SmartphoneVolumeX,
  TabletVolumeX,
  TvVolumeX,
  MonitorMute,
  SmartphoneMute,
  TabletMute,
  TvMute,
  MonitorUnmute,
  SmartphoneUnmute,
  TabletUnmute,
  TvUnmute,
  MonitorPause2,
  SmartphonePause2,
  TabletPause2,
  TvPause2,
  MonitorPlay2,
  SmartphonePlay2,
  TabletPlay2,
  TvPlay2,
  MonitorStop2,
  SmartphoneStop2,
  TabletStop2,
  TvStop2,
  MonitorSkipBack2,
  SmartphoneSkipBack2,
  TabletSkipBack2,
  TvSkipBack2,
  MonitorSkipForward2,
  SmartphoneSkipForward2,
  TabletSkipForward2,
  TvSkipForward2,
  MonitorRewind2,
  SmartphoneRewind2,
  TabletRewind2,
  TvRewind2,
  MonitorFastForward2,
  SmartphoneFastForward2,
  TabletFastForward2,
  TvFastForward2,
  MonitorVolume3,
  SmartphoneVolume3,
  TabletVolume3,
  TvVolume3,
  MonitorVolumeX2,
  SmartphoneVolumeX2,
  TabletVolumeX2,
  TvVolumeX2,
  MonitorMute2,
  SmartphoneMute2,
  TabletMute2,
  TvMute2,
  MonitorUnmute2,
  SmartphoneUnmute2,
  TabletUnmute2,
  TvUnmute2,
  MonitorPause3,
  SmartphonePause3,
  TabletPause3,
  TvPause3,
  MonitorPlay3,
  SmartphonePlay3,
  TabletPlay3,
  TvPlay3,
  MonitorStop3,
  SmartphoneStop3,
  TabletStop3,
  TvStop3,
  MonitorSkipBack3,
  SmartphoneSkipBack3,
  TabletSkipBack3,
  TvSkipBack3,
  MonitorSkipForward3,
  SmartphoneSkipForward3,
  TabletSkipForward3,
  TvSkipForward3,
  MonitorRewind3,
  SmartphoneRewind3,
  TabletRewind3,
  TvRewind3,
  MonitorFastForward3,
  SmartphoneFastForward3,
  TabletFastForward3,
  TvFastForward3,
  MonitorVolume4,
  SmartphoneVolume4,
  TabletVolume4,
  TvVolume4,
  MonitorVolumeX3,
  SmartphoneVolumeX3,
  TabletVolumeX3,
  TvVolumeX3,
  MonitorMute3,
  SmartphoneMute3,
  TabletMute3,
  TvMute3,
  MonitorUnmute3,
  SmartphoneUnmute3,
  TabletUnmute3,
  TvUnmute3
} from 'lucide-react'

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState('image')
  const [selectedTool, setSelectedTool] = useState('select')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(100)
  const [volume, setVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [layers, setLayers] = useState([
    { id: 1, name: 'Background', type: 'image', visible: true, locked: false },
    { id: 2, name: 'Text Layer', type: 'text', visible: true, locked: false },
    { id: 3, name: 'Overlay', type: 'image', visible: true, locked: false },
  ])
  const [showLayers, setShowLayers] = useState(true)
  const [showTimeline, setShowTimeline] = useState(true)
  const [showProperties, setShowProperties] = useState(true)
  const [showAssets, setShowAssets] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showEffects, setShowEffects] = useState(false)
  const [showTransitions, setShowTransitions] = useState(false)
  const [showAudio, setShowAudio] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showUser, setShowUser] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [showCloudSync, setShowCloudSync] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [showPremium, setShowPremium] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showBugReport, setShowBugReport] = useState(false)
  const [showFeatureRequest, setShowFeatureRequest] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showLicense, setShowLicense] = useState(false)
  const [showChangelog, setShowChangelog] = useState(false)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [showBlog, setShowBlog] = useState(false)
  const [showCareers, setShowCareers] = useState(false)
  const [showPress, setShowPress] = useState(false)
  const [showPartners, setShowPartners] = useState(false)
  const [showDevelopers, setShowDevelopers] = useState(false)
  const [showAPI, setShowAPI] = useState(false)
  const [showSDK, setShowSDK] = useState(false)
  const [showPlugins, setShowPlugins] = useState(false)
  const [showIntegrations, setShowIntegrations] = useState(false)
  const [showMarketplace, setShowMarketplace] = useState(false)
  const [showCommunity, setShowCommunity] = useState(false)
  const [showForum, setShowForum] = useState(false)
  const [showDiscord, setShowDiscord] = useState(false)
  const [showSlack, setShowSlack] = useState(false)
  const [showTelegram, setShowTelegram] = useState(false)
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  const [showWeChat, setShowWeChat] = useState(false)
  const [showLine, setShowLine] = useState(false)
  const [showViber, setShowViber] = useState(false)
  const [showSignal, setShowSignal] = useState(false)
  const [showThreema, setShowThreema] = useState(false)
  const [showWickr, setShowWickr] = useState(false)
  const [showTelegramChannel, setShowTelegramChannel] = useState(false)
  const [showTelegramGroup, setShowTelegramGroup] = useState(false)
  const [showTelegramBot, setShowTelegramBot] = useState(false)
  const [showTelegramSticker, setShowTelegramSticker] = useState(false)
  const [showTelegramGif, setShowTelegramGif] = useState(false)
  const [showTelegramVideo, setShowTelegramVideo] = useState(false)
  const [showTelegramAudio, setShowTelegramAudio] = useState(false)
  const [showTelegramDocument, setShowTelegramDocument] = useState(false)
  const [showTelegramLocation, setShowTelegramLocation] = useState(false)
  const [showTelegramContact, setShowTelegramContact] = useState(false)
  const [showTelegramVenue, setShowTelegramVenue] = useState(false)
  const [showTelegramGame, setShowTelegramGame] = useState(false)
  const [showTelegramInvoice, setShowTelegramInvoice] = useState(false)
  const [showTelegramSuccessfulPayment, setShowTelegramSuccessfulPayment] = useState(false)
  const [showTelegramPassportData, setShowTelegramPassportData] = useState(false)
  const [showTelegramProximityAlertTriggered, setShowTelegramProximityAlertTriggered] = useState(false)
  const [showTelegramVideoChatScheduled, setShowTelegramVideoChatScheduled] = useState(false)
  const [showTelegramVideoChatStarted, setShowTelegramVideoChatStarted] = useState(false)
  const [showTelegramVideoChatEnded, setShowTelegramVideoChatEnded] = useState(false)
  const [showTelegramVideoChatParticipantsInvited, setShowTelegramVideoChatParticipantsInvited] = useState(false)
  const [showTelegramWebAppData, setShowTelegramWebAppData] = useState(false)
  const [showTelegramMessageAutoDeleteTimerChanged, setShowTelegramMessageAutoDeleteTimerChanged] = useState(false)
  const [showTelegramForumTopicCreated, setShowTelegramForumTopicCreated] = useState(false)
  const [showTelegramForumTopicEdited, setShowTelegramForumTopicEdited] = useState(false)
  const [showTelegramForumTopicClosed, setShowTelegramForumTopicClosed] = useState(false)
  const [showTelegramForumTopicReopened, setShowTelegramForumTopicReopened] = useState(false)
  const [showTelegramGeneralForumTopicHidden, setShowTelegramGeneralForumTopicHidden] = useState(false)
  const [showTelegramGeneralForumTopicUnhidden, setShowTelegramGeneralForumTopicUnhidden] = useState(false)
  const [showTelegramGiveawayCreated, setShowTelegramGiveawayCreated] = useState(false)
  const [showTelegramGiveaway, setShowTelegramGiveaway] = useState(false)
  const [showTelegramGiveawayWinners, setShowTelegramGiveawayWinners] = useState(false)
  const [showTelegramGiveawayCompleted, setShowTelegramGiveawayCompleted] = useState(false)
  const [showTelegramVideoChatScheduled, setShowTelegramVideoChatScheduled2] = useState(false)
  const [showTelegramVideoChatStarted, setShowTelegramVideoChatStarted2] = useState(false)
  const [showTelegramVideoChatEnded, setShowTelegramVideoChatEnded2] = useState(false)
  const [showTelegramVideoChatParticipantsInvited, setShowTelegramVideoChatParticipantsInvited2] = useState(false)
  const [showTelegramWebAppData, setShowTelegramWebAppData2] = useState(false)
  const [showTelegramMessageAutoDeleteTimerChanged, setShowTelegramMessageAutoDeleteTimerChanged2] = useState(false)
  const [showTelegramForumTopicCreated, setShowTelegramForumTopicCreated2] = useState(false)
  const [showTelegramForumTopicEdited, setShowTelegramForumTopicEdited2] = useState(false)
  const [showTelegramForumTopicClosed, setShowTelegramForumTopicClosed2] = useState(false)
  const [showTelegramForumTopicReopened, setShowTelegramForumTopicReopened2] = useState(false)
  const [showTelegramGeneralForumTopicHidden, setShowTelegramGeneralForumTopicHidden2] = useState(false)
  const [showTelegramGeneralForumTopicUnhidden, setShowTelegramGeneralForumTopicUnhidden2] = useState(false)
  const [showTelegramGiveawayCreated, setShowTelegramGiveawayCreated2] = useState(false)
  const [showTelegramGiveaway, setShowTelegramGiveaway2] = useState(false)
  const [showTelegramGiveawayWinners, setShowTelegramGiveawayWinners2] = useState(false)
  const [showTelegramGiveawayCompleted, setShowTelegramGiveawayCompleted2] = useState(false)

  const tools = [
    { id: 'select', name: 'Select', icon: MousePointer },
    { id: 'move', name: 'Move', icon: MoveIcon },
    { id: 'crop', name: 'Crop', icon: Crop },
    { id: 'rotate', name: 'Rotate', icon: RotateCw },
    { id: 'flip', name: 'Flip', icon: FlipHorizontal },
    { id: 'text', name: 'Text', icon: Type },
    { id: 'brush', name: 'Brush', icon: Brush },
    { id: 'eraser', name: 'Eraser', icon: Eraser },
    { id: 'shape', name: 'Shape', icon: Square },
    { id: 'pen', name: 'Pen', icon: PenTool },
    { id: 'eyedropper', name: 'Eyedropper', icon: Droplets },
    { id: 'hand', name: 'Hand', icon: Hand },
    { id: 'zoom', name: 'Zoom', icon: ZoomIn },
  ]

  const imageTools = [
    { id: 'filters', name: 'Filters', icon: Filter },
    { id: 'effects', name: 'Effects', icon: Sparkles },
    { id: 'adjustments', name: 'Adjustments', icon: Palette },
    { id: 'ai', name: 'AI Tools', icon: Wand2 },
    { id: 'background', name: 'Background', icon: Target },
    { id: 'retouch', name: 'Retouch', icon: Zap },
  ]

  const videoTools = [
    { id: 'timeline', name: 'Timeline', icon: Clock },
    { id: 'transitions', name: 'Transitions', icon: Scissors },
    { id: 'audio', name: 'Audio', icon: Music },
    { id: 'effects', name: 'Effects', icon: Sparkles },
    { id: 'text', name: 'Text', icon: Type },
    { id: 'overlays', name: 'Overlays', icon: Layers },
  ]

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary-400" />
              <span className="font-semibold">EditX Studio</span>
            </div>
            
            {/* File Menu */}
            <div className="flex items-center space-x-2">
              <button className="toolbar-item flex items-center space-x-1">
                <Upload className="h-4 w-4" />
                <span>Import</span>
              </button>
              <button className="toolbar-item flex items-center space-x-1">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
              <button className="toolbar-item flex items-center space-x-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>

            {/* Edit Menu */}
            <div className="flex items-center space-x-2">
              <button className="toolbar-item flex items-center space-x-1">
                <Undo className="h-4 w-4" />
                <span>Undo</span>
              </button>
              <button className="toolbar-item flex items-center space-x-1">
                <Redo className="h-4 w-4" />
                <span>Redo</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="toolbar-item">
              <Settings className="h-4 w-4" />
            </button>
            <button className="toolbar-item">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="toolbar-item">
              <User className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Tools */}
        <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-2">
          {/* Tab Switcher */}
          <div className="flex flex-col space-y-1">
            <button 
              onClick={() => setActiveTab('image')}
              className={`p-2 rounded-lg transition-colors ${activeTab === 'image' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setActiveTab('video')}
              className={`p-2 rounded-lg transition-colors ${activeTab === 'video' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Video className="h-5 w-5" />
            </button>
          </div>

          <div className="w-full h-px bg-gray-700 my-2"></div>

          {/* Tools */}
          {activeTab === 'image' ? (
            <>
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`toolbar-item ${selectedTool === tool.id ? 'active' : ''}`}
                  title={tool.name}
                >
                  <tool.icon className="h-5 w-5" />
                </button>
              ))}
              
              <div className="w-full h-px bg-gray-700 my-2"></div>
              
              {imageTools.map((tool) => (
                <button
                  key={tool.id}
                  className="toolbar-item"
                  title={tool.name}
                >
                  <tool.icon className="h-5 w-5" />
                </button>
              ))}
            </>
          ) : (
            <>
              {videoTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`toolbar-item ${selectedTool === tool.id ? 'active' : ''}`}
                  title={tool.name}
                >
                  <tool.icon className="h-5 w-5" />
                </button>
              ))}
            </>
          )}
        </div>

        {/* Center - Canvas/Preview */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Header */}
          <div className="bg-gray-800 border-b border-gray-700 p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button className="p-1 rounded hover:bg-gray-700">
                    <Minimize className="h-4 w-4" />
                  </button>
                  <button className="p-1 rounded hover:bg-gray-700">
                    <Maximize className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1 rounded hover:bg-gray-700">
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="text-sm">{zoom}%</span>
                  <button className="p-1 rounded hover:bg-gray-700">
                    <ZoomIn className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {activeTab === 'video' && (
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-lg bg-primary-500 hover:bg-primary-600"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 rounded hover:bg-gray-700"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-20"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl canvas-container">
              <div className="w-[800px] h-[600px] bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Upload className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">Drop your media here</p>
                  <p className="text-sm">or click to browse files</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties/Layers */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          {/* Sidebar Tabs */}
          <div className="flex border-b border-gray-700">
            <button 
              onClick={() => setShowProperties(true)}
              className={`flex-1 p-3 text-sm font-medium transition-colors ${showProperties ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Properties
            </button>
            <button 
              onClick={() => setShowLayers(true)}
              className={`flex-1 p-3 text-sm font-medium transition-colors ${showLayers ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Layers
            </button>
            <button 
              onClick={() => setShowAssets(true)}
              className={`flex-1 p-3 text-sm font-medium transition-colors ${showAssets ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Assets
            </button>
          </div>

          {/* Properties Panel */}
          {showProperties && (
            <div className="flex-1 p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Transform</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-400">Position X</label>
                    <input type="number" className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Position Y</label>
                    <input type="number" className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Width</label>
                    <input type="number" className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Height</label>
                    <input type="number" className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Rotation</label>
                    <input type="number" className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Appearance</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-gray-400">Opacity</label>
                    <input type="range" min="0" max="100" className="w-full" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Blend Mode</label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm">
                      <option>Normal</option>
                      <option>Multiply</option>
                      <option>Screen</option>
                      <option>Overlay</option>
                    </select>
                  </div>
                </div>
              </div>

              {selectedTool === 'text' && (
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Text</h3>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Enter text..." 
                      className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" 
                    />
                    <select className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm">
                      <option>Arial</option>
                      <option>Helvetica</option>
                      <option>Times New Roman</option>
                    </select>
                    <input type="number" placeholder="Font Size" className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Layers Panel */}
          {showLayers && (
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-300">Layers</h3>
                <button className="text-primary-400 hover:text-primary-300">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-1">
                {layers.map((layer) => (
                  <div key={layer.id} className="layer-item">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => {
                          setLayers(layers.map(l => 
                            l.id === layer.id ? { ...l, visible: !l.visible } : l
                          ))
                        }}
                      >
                        {layer.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button 
                        onClick={() => {
                          setLayers(layers.map(l => 
                            l.id === layer.id ? { ...l, locked: !l.locked } : l
                          ))
                        }}
                      >
                        {layer.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      </button>
                      <span className="text-sm">{layer.name}</span>
                    </div>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assets Panel */}
          {showAssets && (
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-300">Assets</h3>
                <button className="text-primary-400 hover:text-primary-300">
                  <Upload className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-700 rounded p-2 text-center">
                  <ImageIcon className="h-8 w-8 mx-auto mb-1 text-gray-400" />
                  <span className="text-xs">Images</span>
                </div>
                <div className="bg-gray-700 rounded p-2 text-center">
                  <Video className="h-8 w-8 mx-auto mb-1 text-gray-400" />
                  <span className="text-xs">Videos</span>
                </div>
                <div className="bg-gray-700 rounded p-2 text-center">
                  <Music className="h-8 w-8 mx-auto mb-1 text-gray-400" />
                  <span className="text-xs">Audio</span>
                </div>
                <div className="bg-gray-700 rounded p-2 text-center">
                  <Type className="h-8 w-8 mx-auto mb-1 text-gray-400" />
                  <span className="text-xs">Text</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Timeline (Video Mode) */}
      {activeTab === 'video' && showTimeline && (
        <div className="h-32 bg-gray-800 border-t border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-300">Timeline</h3>
            <div className="flex items-center space-x-2">
              <button className="p-1 rounded hover:bg-gray-700">
                <ZoomIn className="h-4 w-4" />
              </button>
              <button className="p-1 rounded hover:bg-gray-700">
                <ZoomOut className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="timeline-track">
            <div className="flex items-center space-x-2">
              <div className="w-20 text-xs text-gray-400">Video</div>
              <div className="flex-1 bg-gray-700 rounded h-8"></div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-20 text-xs text-gray-400">Audio</div>
              <div className="flex-1 bg-gray-700 rounded h-8"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}