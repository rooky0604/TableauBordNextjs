"use client";

import {
  Activity,
  AlertCircle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  MoreVertical,
  Search,
  TrendingUp,
  User,
} from "lucide-react";
import React, { useState } from "react";

type TicketStatus = "open" | "in-progress" | "closed";
type TicketPriority = "high" | "medium" | "low";
type FilterType = "all" | TicketStatus;
type SortField = "status" | "priority" | "date" | null;
type SortDirection = "asc" | "desc";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  author: string;
  date: string;
  category: string;
  assignee: string;
}

export default function TicketList() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<FilterType>("all");
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const tickets: Ticket[] = [
    {
      id: "TK-001",
      title: "Bug dans le formulaire de connexion",
      description:
        "Les utilisateurs ne peuvent pas se connecter avec leur email",
      status: "open",
      priority: "high",
      author: "Marie Dubois",
      date: "2024-11-28",
      category: "Bug",
      assignee: "Dev Team",
    },
    {
      id: "TK-002",
      title: "Nouvelle fonctionnalité: Export CSV",
      description: "Ajouter la possibilité d'exporter les données en CSV",
      status: "in-progress",
      priority: "medium",
      author: "Pierre Martin",
      date: "2024-11-27",
      category: "Feature",
      assignee: "Backend Team",
    },
    {
      id: "TK-003",
      title: "Amélioration des performances",
      description: "Optimiser le temps de chargement de la page d'accueil",
      status: "closed",
      priority: "low",
      author: "Sophie Laurent",
      date: "2024-11-25",
      category: "Enhancement",
      assignee: "Frontend Team",
    },
    {
      id: "TK-004",
      title: "Erreur 500 sur la page profil",
      description: "Erreur serveur lors de l'accès à la page profil",
      status: "open",
      priority: "high",
      author: "Jean Dupont",
      date: "2024-11-29",
      category: "Bug",
      assignee: "Backend Team",
    },
    {
      id: "TK-005",
      title: "Documentation API manquante",
      description: "Documenter les endpoints de l'API REST",
      status: "in-progress",
      priority: "medium",
      author: "Claire Bernard",
      date: "2024-11-26",
      category: "Documentation",
      assignee: "Tech Writers",
    },
    {
      id: "TK-006",
      title: "Migration vers Next.js 15",
      description:
        "Mettre à jour le projet vers la dernière version de Next.js",
      status: "open",
      priority: "high",
      author: "Thomas Rousseau",
      date: "2024-11-30",
      category: "Enhancement",
      assignee: "Dev Team",
    },
  ];

  const getStatusConfig = (status: TicketStatus) => {
    const configs = {
      open: {
        label: "Ouvert",
        icon: <AlertCircle className="h-3 w-3" />,
        bg: darkMode ? "bg-blue-500/10" : "bg-blue-50",
        text: darkMode ? "text-blue-400" : "text-blue-600",
        border: darkMode ? "border-blue-500/20" : "border-blue-200",
      },
      "in-progress": {
        label: "En cours",
        icon: <Clock className="h-3 w-3" />,
        bg: darkMode ? "bg-amber-500/10" : "bg-amber-50",
        text: darkMode ? "text-amber-400" : "text-amber-600",
        border: darkMode ? "border-amber-500/20" : "border-amber-200",
      },
      closed: {
        label: "Fermé",
        icon: <CheckCircle className="h-3 w-3" />,
        bg: darkMode ? "bg-emerald-500/10" : "bg-emerald-50",
        text: darkMode ? "text-emerald-400" : "text-emerald-600",
        border: darkMode ? "border-emerald-500/20" : "border-emerald-200",
      },
    };
    return configs[status];
  };

  const getPriorityConfig = (priority: TicketPriority) => {
    const configs = {
      high: {
        label: "Haute",
        bg: darkMode ? "bg-red-500/10" : "bg-red-50",
        text: darkMode ? "text-red-400" : "text-red-600",
      },
      medium: {
        label: "Moyenne",
        bg: darkMode ? "bg-purple-500/10" : "bg-purple-50",
        text: darkMode ? "text-purple-400" : "text-purple-600",
      },
      low: {
        label: "Basse",
        bg: darkMode ? "bg-gray-500/10" : "bg-gray-100",
        text: darkMode ? "text-gray-400" : "text-gray-600",
      },
    };
    return configs[priority];
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Fonction de tri
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Inverser la direction si on clique sur la même colonne
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Nouvelle colonne : tri ascendant par défaut
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Ordre de priorité pour le tri
  const priorityOrder: Record<TicketPriority, number> = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // Ordre de statut pour le tri
  const statusOrder: Record<TicketStatus, number> = {
    open: 3,
    "in-progress": 2,
    closed: 1,
  };

  // Appliquer le tri
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (!sortField) return 0;

    let comparison = 0;

    switch (sortField) {
      case "priority":
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case "status":
        comparison = statusOrder[a.status] - statusOrder[b.status];
        break;
      case "date":
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const stats = [
    {
      label: "Nombre de tickets",
      value: tickets.length,
      icon: <Activity className="h-5 w-5" />,
      color: darkMode ? "text-blue-400" : "text-blue-600",
      bgColor: darkMode
        ? "bg-blue-500/10 hover:bg-blue-500/20"
        : "bg-blue-50 hover:bg-blue-100",
      borderColor: darkMode ? "border-blue-500/30" : "border-blue-200",
      filter: "all" as FilterType,
    },
    {
      label: "Ouverts",
      value: tickets.filter((t) => t.status === "open").length,
      icon: <AlertCircle className="h-5 w-5" />,
      color: darkMode ? "text-blue-400" : "text-blue-600",
      bgColor: darkMode
        ? "bg-blue-500/10 hover:bg-blue-500/20"
        : "bg-blue-50 hover:bg-blue-100",
      borderColor: darkMode ? "border-blue-500/30" : "border-blue-200",
      filter: "open" as FilterType,
    },
    {
      label: "En cours",
      value: tickets.filter((t) => t.status === "in-progress").length,
      icon: <Clock className="h-5 w-5" />,
      color: darkMode ? "text-amber-400" : "text-amber-600",
      bgColor: darkMode
        ? "bg-amber-500/10 hover:bg-amber-500/20"
        : "bg-amber-50 hover:bg-amber-100",
      borderColor: darkMode ? "border-amber-500/30" : "border-amber-200",
      filter: "in-progress" as FilterType,
    },
    {
      label: "Fermés",
      value: tickets.filter((t) => t.status === "closed").length,
      icon: <CheckCircle className="h-5 w-5" />,
      color: darkMode ? "text-emerald-400" : "text-emerald-600",
      bgColor: darkMode
        ? "bg-emerald-500/10 hover:bg-emerald-500/20"
        : "bg-emerald-50 hover:bg-emerald-100",
      borderColor: darkMode ? "border-emerald-500/30" : "border-emerald-200",
      filter: "closed" as FilterType,
    },
  ];

  const bgClass = darkMode ? "bg-slate-950" : "bg-slate-50";
  const cardBg = darkMode ? "bg-slate-900" : "bg-white";
  const borderClass = darkMode ? "border-slate-800" : "border-slate-200";
  const textPrimary = darkMode ? "text-slate-100" : "text-slate-900";
  const textSecondary = darkMode ? "text-slate-400" : "text-slate-600";
  const inputBg = darkMode ? "bg-slate-800" : "bg-white";
  const inputBorder = darkMode ? "border-slate-700" : "border-slate-300";

  // Fonction pour afficher l'icône de tri
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 opacity-30" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-200`}>
      {/* Header avec toggle dark mode */}
      <div className={`${cardBg} border-b ${borderClass}`}>
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-semibold ${textPrimary}`}>
                Gestion des Tickets
              </h1>
              <p className={`mt-1 text-sm ${textSecondary}`}>
                Vue d'ensemble et suivi des tickets
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`rounded-lg px-4 py-2 ${inputBg} ${inputBorder} border ${textPrimary} text-sm font-medium transition-opacity hover:opacity-80`}
            >
              {darkMode ? "☀️ Clair" : "🌙 Sombre"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Stats Cards - Actions rapides */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <button
              key={index}
              onClick={() => setStatusFilter(stat.filter)}
              className={`${cardBg} rounded-lg border-2 p-6 text-left transition-all duration-200 ${
                statusFilter === stat.filter
                  ? `${stat.bgColor} ${stat.borderColor}`
                  : `${borderClass} hover:${stat.bgColor}`
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                {statusFilter === stat.filter && (
                  <div
                    className={`h-2 w-2 rounded-full ${stat.color.replace("text-", "bg-")}`}
                  ></div>
                )}
              </div>
              <p className={`mb-1 text-3xl font-bold ${textPrimary}`}>
                {stat.value}
              </p>
              <p className={`text-sm ${textSecondary}`}>{stat.label}</p>
            </button>
          ))}
        </div>

        {/* Filtres */}
        <div className={`${cardBg} rounded-lg border ${borderClass} mb-6 p-4`}>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                className={`absolute left-3 top-1/2 -translate-y-1/2 transform ${textSecondary} h-4 w-4`}
              />
              <input
                type="text"
                placeholder="Rechercher un ticket..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full py-2 pl-10 pr-4 ${inputBg} border ${inputBorder} rounded-lg ${textPrimary} text-sm placeholder-slate-500 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        {/* Table des tickets */}
        <div
          className={`${cardBg} rounded-lg border ${borderClass} overflow-hidden`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                className={`${darkMode ? "bg-slate-800/50" : "bg-slate-50"} border-b ${borderClass}`}
              >
                <tr>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}
                  >
                    Ticket
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} cursor-pointer uppercase tracking-wider hover:${textPrimary} transition-colors`}
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center gap-2">
                      Statut
                      {getSortIcon("status")}
                    </div>
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} cursor-pointer uppercase tracking-wider hover:${textPrimary} transition-colors`}
                    onClick={() => handleSort("priority")}
                  >
                    <div className="flex items-center gap-2">
                      Priorité
                      {getSortIcon("priority")}
                    </div>
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} uppercase tracking-wider`}
                  >
                    Assigné à
                  </th>
                  <th
                    className={`px-6 py-3 text-left text-xs font-medium ${textSecondary} cursor-pointer uppercase tracking-wider hover:${textPrimary} transition-colors`}
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center gap-2">
                      Date
                      {getSortIcon("date")}
                    </div>
                  </th>
                  <th
                    className={`px-6 py-3 text-right text-xs font-medium ${textSecondary} uppercase tracking-wider`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {sortedTickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <AlertCircle
                        className={`h-12 w-12 ${textSecondary} mx-auto mb-3`}
                      />
                      <p className={textSecondary}>Aucun ticket trouvé</p>
                    </td>
                  </tr>
                ) : (
                  sortedTickets.map((ticket) => {
                    const statusConfig = getStatusConfig(ticket.status);
                    const priorityConfig = getPriorityConfig(ticket.priority);

                    return (
                      <tr
                        key={ticket.id}
                        className={`${darkMode ? "hover:bg-slate-800/50" : "hover:bg-slate-50"} transition-colors`}
                      >
                        <td className="px-6 py-4">
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <span
                                className={`font-mono text-xs ${textSecondary}`}
                              >
                                {ticket.id}
                              </span>
                              <span
                                className={`px-2 py-0.5 ${darkMode ? "bg-slate-800" : "bg-slate-100"} ${textSecondary} rounded text-xs`}
                              >
                                {ticket.category}
                              </span>
                            </div>
                            <p className={`font-medium ${textPrimary} text-sm`}>
                              {ticket.title}
                            </p>
                            <p className={`text-xs ${textSecondary} mt-1`}>
                              {ticket.description}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                          >
                            {statusConfig.icon}
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${priorityConfig.bg} ${priorityConfig.text}`}
                          >
                            {priorityConfig.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User className={`h-4 w-4 ${textSecondary}`} />
                            <span className={`text-sm ${textPrimary}`}>
                              {ticket.assignee}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className={`h-4 w-4 ${textSecondary}`} />
                            <span className={`text-sm ${textSecondary}`}>
                              {new Date(ticket.date).toLocaleDateString(
                                "fr-FR",
                                { day: "2-digit", month: "short" },
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            className={`rounded-lg p-2 ${darkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"} transition-colors`}
                          >
                            <MoreVertical
                              className={`h-4 w-4 ${textSecondary}`}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
